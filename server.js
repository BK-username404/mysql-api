const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 налаштування MySQL (візьми свої дані)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// 🚀 API для отримання даних
app.get("/getdata", (req, res) => {
  db.query("SELECT * FROM main LIMIT 100", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// 🚀 API для додавання даних
app.post("/add", (req, res) => {
  const { name, age } = req.body;
  db.query("INSERT INTO main (name, age) VALUES (?, ?)", [name, age], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

// Render потребує цей порт
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

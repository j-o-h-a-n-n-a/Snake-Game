const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express(); // ← Erst hier gibt's 'app'
const PORT = 3000;
const scorePath = path.join(__dirname, "highscore.json");

app.use(express.json()); // Middleware, um JSON zu lesen

// GET /highscore → gibt einen Test-Score zurück
app.get("/highscore", (req, res) => {
  const data = fs.readFileSync(scorePath, "utf8");
  const highscore = JSON.parse(data);
  res.json(highscore);
});

// POST /highscore → nimmt neuen Score entgegen (noch ohne Speicherung)
app.post("/highscore", (req, res) => {
  const newScore = req.body.score;
  const data = fs.readFileSync(scorePath, "utf8");
  const currentHighscore = JSON.parse(data).score;

  if (newScore > currentHighscore) {
    fs.writeFileSync(scorePath, JSON.stringify({ score: newScore }));
    res.json({ message: "Neuer Highscore gespeichert!", score: newScore });
  } else {
    res.json({ message: "Kein neuer Highscore.", score: currentHighscore });
  }
});

// Server starten
app.listen(PORT, () => {
  console.log(`✅ Server läuft auf http://localhost:${PORT}`);
});
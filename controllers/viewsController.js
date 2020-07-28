const express = require("express");
const router = express.Router();
const path = require("path");

// HTML ROUTES
router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});
router.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = router;

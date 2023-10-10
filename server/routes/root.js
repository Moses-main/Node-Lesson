const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/root(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/views", "index.html"));
});

router.get("/about(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/views", "about.html"));
});

router.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
});

module.exports = router;

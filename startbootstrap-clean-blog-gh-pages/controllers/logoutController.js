const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/auth/logout", async (req, res) => {
  const cookie = req.cookies;
  try {
    if (!cookie) {
      res.cookie("jwt", " ");
    } else {
      loggedIn = null;
      await res.clearCookie("jwt");
      res.render("index", loggedIn);
    }
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;

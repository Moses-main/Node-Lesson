const express = require("express");
const router = express.Router();
// const flash = require("connect-flash");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const path = require("path");
// const { body, validationResult } = require("express-validator");

// Route for handling user sign-up
router.post(
  "/signup",

  async (req, res) => {
    try {
      const { username, password } = req.body;
      // check if the user already exits in the database
      const exitingUser = await User.findOne({ username });

      if (exitingUser) {
        res.render("register", {
          // successMsg: req.flash("success"),
          error: "Username already taken. Please try another",
        });
        return;
      }

      const newUser = new User({ username, password });
      await newUser.save();

      res.redirect("/auth/login");
    } catch (error) {
      // const validationErrors = error.message;
      // req.flash("validationErrors", validationErrors);
      // req.flash("data", req.body);
      // res.render("register", { error: error.message });
      res.render("register", { error: error.message });
    }
  }
);

module.exports = router;

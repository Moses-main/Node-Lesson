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

  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      // check if the user already exits in the database
      const exitingUser = await User.findOne({ username });

      if (exitingUser) {
        //User already exits
        res.render("register", {
          errorMessage: "Username already taken. Please try another",
        });
        return;
      }
      const newUser = new User({ username, password });
      await newUser.save();

      // redirect to log in page
      res.redirect("/auth/login");
    } catch (error) {
      req.flash("error", error.message);

      // Render the message.ejs file with the message
      // res.render("register", { message: message });
      res.redirect("/register"); // redirect to register page
      // res.render("register", {
      //   messages: req.flash("error"),
      // });
      next();
    }
  }
);

module.exports = router;

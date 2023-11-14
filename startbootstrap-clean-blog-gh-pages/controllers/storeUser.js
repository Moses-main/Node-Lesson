const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Route for handling user sign-up
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    // redirect to log in page
    res.redirect("/auth/login");
    // res.status(200).send("success");
    // res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    console.error(error);
    // render the signup page with the error message
    res.render("register", {
      errorMessage: "Oops! Something went wrong. Please try again",
    });
    // res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // check if the user exits in the database
    const user = await User.findOne({ username });
    if (user) {
      // compare the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        // successfully logged in
        res.redirect("/");
      } else {
        //failed login (incorrect password)
        res.render("/auth/login");
      }
    } else {
      //failed login (user not found)
      res.render("/auth/login");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

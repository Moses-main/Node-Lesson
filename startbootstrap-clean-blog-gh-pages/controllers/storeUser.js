const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Route for handling user sign-up
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    // check if the user already exits in the database
    const exitingUser = await User.findOne({ username });

    if (exitingUser) {
      //User already exits
      // res.render("register", {
      //   errorMessage: "Username already taken. Please try another",
      // });
      console.log("Username already taken. Please try another.");
      // res
      //   .status(201)
      //   .json({ message: "Username already taken. Please try another" });

      return;
    }

    //hash the password
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password });
    await newUser.save();

    // redirect to log in page
    res.redirect("/auth/login");
    // res.status(200).send("success");
    // res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    console.error(error);
    // render the signup page with the error message
    // res.render("register", {
    //   errorMessage: "Oops! Something went wrong. Please try again",
    // });
    console.log("Oops! Something went wrong. Please try again.");
    // res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

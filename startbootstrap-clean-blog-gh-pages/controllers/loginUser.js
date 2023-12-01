const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/users/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // check if the user exits in the database
    const user = await User.findOne({ username });
    if (user) {
      // compare the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        req.sessionID = user._id; // the session ID gotten from the
        // database user id

        // successfully logged in
        console.log(req.sessionID);
        // res.status(200).json({ message: "Successfully Logged In" });
        res.redirect("/dashboard");
      } else {
        // failed login (incorrect password)
        // res.render("login");
        // res.json(errorMessage);
        // res.render("register", {
        //   errorMessage: "Incorrect Password",
        // });
        // const error = "Error: Incorrect Password.";
        // console.log("Error: Incorrect Password.");
        res.status(201).json({ message: "Incorrect Password, Try again" });
      }
      if (password === undefined || password === null) {
        res.status(200).json({ message: "Please enter password" });
      }
    } else {
      //failed login (user not found)
      // res.render("login", {
      //   errorMessage: "Username not found, Check the details and try again",
      // });
      // const error = "Username not found";

      // res.render("login", { error: error });
      // console.log("Error: Username not found.");
      res.status(201).json({
        message: "username not found, Check the details and try again",
      });
      // res.render("login");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

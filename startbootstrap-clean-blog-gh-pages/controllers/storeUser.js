// const express = require("express");
// const app = express();

// app.use(express.static("public"));

// const formModel = require("../models/User.js");
// // const path = require("path");

// module.exports = async (req, res) => {
//   try {
//     // create a new document with the submitted data
//     const formEntry = formModel(req.body);
//     // Save the document to the database
//     await formEntry.save();

//     res.status(200).send("form submitted successfully");
//   } catch (error) {
//     res.status(500).send("internal server error: " + error.message);
//   }
// };
const express = require("express");
const router = express.Router();
// const User = require("../models/userModel");
const User = require("../models/User");

// Route for user sign-up form
// router.get("/signup", (req, res) => {
//   res.render("signupForm");
// });

// /users/signup
// Route for handling user sign-up
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    // redirect to log in page
    res.redirect("users/login");
    // res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    console.error(error);
    // render the signup page with the error message
    res.render("register", {
      errorMessage: "Registration failed. Please try again",
    });
    // res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

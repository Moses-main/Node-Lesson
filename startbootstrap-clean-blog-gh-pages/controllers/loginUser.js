// const bcrypt = require("bcrypt");
// const User = require("../models/User");
// // const session =require(")
// module.exports = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     //check if the user exits in the database
//     const user = await User.findOne({ username });

//     if (!user) {
//       // User not found in the database
//       res.render("login", { errorMessage: "User not found. Please register" });
//       return;
//     }

//     //   check the hashed password
//     const isPasswordValid = await user.comparePassword(password);
//     if (isPasswordValid) {
//       //successful login
//       req.sessionID = user._id;
//       // Do something with sessionId
//       // req.session.userId = user._id;
//       // console.log(req.sessionID);
//       alert("Successfully logged in");
//       res.redirect("/dashboard");
//     } else {
//       res.render("login", {
//         errorMessage: "Invalid password, please try again",
//       });
//     }

//     //   if (user) {
//     //     bcrypt.compare(password, user.password, (error, same) => {
//     //       if (same) {
//     //         //if passwords match
//     //         // store user session, will talk about it later
//     //         res.redirect("/");
//     //       } else {
//     //         res.redirect("/login");
//     //       }
//     //     });
//     //   } else {
//     //     res.redirect("/login");
//     //   }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

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
        //failed login (incorrect password)
        // res.render("login");
        // res.json(errorMessage);
        // res.render("register", {
        //   errorMessage: "Incorrect Password",
        // });
        console.log("Error: Incorrect Password.");
        // res.status(201).json({ message: "Incorrect Password, Try again" });
      }
    } else {
      //failed login (user not found)
      // res.render("login", {
      //   errorMessage: "Username not found, Check the details and try again",
      // });
      console.log("Error: Username not found.");
      // res.status(201).json({
      //   message: "username not found, Check the details and try again",
      // });
      // res.render("login");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

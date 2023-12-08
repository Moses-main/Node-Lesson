const express = require("express");
// const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    // const error = "error: no cookies found";
    res.sendStatus(401);
  }
  // res.send(JSON.stringify(cookies.jwt));
  console.log(cookies.jwt);
  const refreshToken = cookies.refreshToken;

  const foundUser = User.findOne({ refreshToken: refreshToken });
  if (!foundUser) {
    return sendStatus(403); // Forbidden
  }
  // evaluate jwt

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
      return res.sendStatus(403); // Forbidden
    }
    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.json({ accessToken });
  });
};

module.exports = handleRefreshToken; // { handleRefreshToken };
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
// router.post("/users/login", async (req, res) => {
//   try {
//     const cookies = req.cookies;
//     if (!cookies?.jwt) {
//       // const error = "error: no cookies found";
//       res.sendStatus(401);
//     }
//     // res.send(JSON.stringify(cookies.jwt));
//     console.log(cookies.jwt);
//     const refreshToken = cookies.refreshToken;

//     const user = await User.findOne({ refreshToken });
//     if (user) {
//       // compare the hashed password
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (isPasswordValid) {
//         // Create JWTs
//         const accessToken = jwt.sign(
//           {
//             username: username,
//           },
//           process.env.ACCESS_TOKEN_SECRET,
//           { expiresIn: "5m" }
//         );
//         const refreshToken = jwt.sign(
//           {
//             username: username,
//           },
//           process.env.REFRESH_TOKEN_SECRET,
//           { expiresIn: "1d" }
//         );
//         const currentUser = await User.findOne({ username: username });
//         if (!currentUser) {
//           error = "User not found";
//           res.render("login", { error: error });
//         }
//         // );
//         //GETTING THE OTHER USERS IN THE DATABASE EXCEPT FROM THE CURRENT USER THAT IS LOGGED IN

//         const otherUsers = await User.find({
//           username: { $ne: currentUser },
//         });

//         // Giving the current user an access token
//         // that would be retrieved on the logout section

//         const activeUser = { ...currentUser, refreshToken }; // the three dot serves as a way to add or merge files together using an array of strings in the above example

//         res.cookie("jwt", refreshToken, {
//           httpOnly: true,
//           maxAge: 24 * 60 * 60 * 1000,
//           // headers: { refreshToken },
//         });
//         res.json({ accessToken });

//         // res.status(200).json({ activeUser });

//         // res.redirect("/");
//       } else {
//         const error = "Error: Incorrect Password.";
//         res.render("login", { error: error });
//       }
//       if (password === undefined || password === null) {
//         // res.status(200).json({ message: "Please enter password" });

//         const error = "Error: Please enter password.";
//         res.render("login", { error: error });
//       }
//     } else {
//       //failed login (user not found)
//       // res.render("login", {
//       //   errorMessage: "Username not found, Check the details and try again",
//       // });
//       // const error = "Username not found";
//       const error =
//         "Error: username not found, Check the details and try again.";
//       res.render("login", { error: error });

//       // res.render("login", { error: error });
//       // // console.log("Error: Username not found.");
//       // res.status(201).json({
//       //   message: "username not found, Check the details and try again",
//       // });
//       // res.render("login");
//     }
//   } catch (error) {
//     console.error(error);

//     // const error = "Error: Please enter password.";
//     res.render("login", { error: error });
//     // res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;

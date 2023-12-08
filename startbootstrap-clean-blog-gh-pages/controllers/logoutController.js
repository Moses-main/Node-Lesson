const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const status = require("statuses");
require("dotenv").config();

module.exports = async (req, res) => {
  // For the frontend programmer
  //   delete the accessToken
  const cookies = req.cookies;

  try {
    if (!cookies?.jwt) {
      // res.status(401).json({ message: "There's a cookie " });
      res.clearCookie("jwt", " ", {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.redirect("/auth/login");
    }
  } catch (error) {
    console.error(error);

    res.status(200).json({ message: "No cookies found" });
  }
}; //

//   try {
//     const cookies = req.cookies;
//     if (!cookies?.jwt) {
//       res.status(401);
//     }
//     const refreshToken = cookies.refreshToken;

//     const foundUser = await User.findOne({ refreshToken: refreshToken });
//     if (!foundUser) {
//       res.clearCookie("jwt", refreshToken, {
//         httpOnly: true,
//         maxAge: 24 * 60 * 60 * 1000,
//       });
//       res.status(204).json({ status: "successfully logged out" });
//     }

//     // Delete the refresh token in the database
//     const otherUsers = await User.find({
//       username: { $ne: foundUser },
//     });

//     const currentUser = { ...foundUser, refreshToken: " " };

//     res.clearCookie("jwt", {
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     res.status(204).json({ message: "logged out" });
//     return status(204); // successful but no content
//   } catch (error) {
//     console.error(error);
//     // const currentPage = req.url;
//     // res.redirect(currentPage);
//     res.status(404).json({ status: "Error with logging out" });
//   }
// };

// // module.exports = router;

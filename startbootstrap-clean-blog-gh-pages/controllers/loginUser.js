const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;

    //check if the user exits in the database
    const user = await User.findOne({ username });

    if (!user) {
      // User not found in the database
      res.render("login", { errorMessage: "User not found. Please register" });
      return;
    }

    //   check the hashed password
    const isPasswordValid = await user.comparePassword(password);
    if (isPasswordValid) {
      //successful login
      res.redirect("/");
    } else {
      res.render("login", {
        errorMessage: "Invalid password, please try again",
      });
    }

    //   if (user) {
    //     bcrypt.compare(password, user.password, (error, same) => {
    //       if (same) {
    //         //if passwords match
    //         // store user session, will talk about it later
    //         res.redirect("/");
    //       } else {
    //         res.redirect("/login");
    //       }
    //     });
    //   } else {
    //     res.redirect("/login");
    //   }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const express = require("express");
const session = require("express-session");

module.exports = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Error destroying session", error);
      return res.status(500).send("Error loging out");
    }
    res.clearCookie("sessionID");
    // res.redirect("/");
    console.log("successfully logged out");
  });
};

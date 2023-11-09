const express = require("express");
const app = express();

const formModel = require("../models/User.js");
const path = require("path");

app.use(express.static("public"));

module.exports = async (req, res) => {
  try {
    // create a new document with the submitted data
    const formEntry = new formModel(req.body);
    // Save the document to the database
    await formEntry.save();

    res.status(200).send("form submitted successfully");
    // res.sendFile(path.join(__dirname, "..", "about.ejs"));
  } catch (error) {
    res.status(500).send("internal server error: " + error.message);
  }
};

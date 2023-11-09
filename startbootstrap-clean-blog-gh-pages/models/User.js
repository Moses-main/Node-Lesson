const mongoose = require("mongoose");

const dbURL = "mongodb://localhost/App";
// connecting to the database
mongoose.connect(dbURL);
mongoose.connection;

// create a mongooseModel
const formModel = mongoose.model("registered", {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = formModel;

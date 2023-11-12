const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dbURL = "mongodb://localhost/App";

// connecting to the database
mongoose.connect(dbURL);
mongoose.connection;

const BlogPostSchema = new mongoose.Schema({
  title: String,
  body: String,
  content: String,
  timestamp: { type: Date, default: Date.now },
});

const BlogPost = new mongoose.model("BlogPost", BlogPostSchema);
module.exports = BlogPost;

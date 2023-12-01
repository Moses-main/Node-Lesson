const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dbURL = "mongodb://localhost/App";

// connecting to the database
mongoose.connect(dbURL);
mongoose.connection;

const BlogPostSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  postTitle: {
    type: String,
    required: true,
    unique: true,
  },
  postContent: {
    type: String,
    required: true,
  },
  imgContent: {
    type: String,
    required: false,
  },
  timestamp: { type: Date, default: Date.now },
});

const Blog = new mongoose.model("post", BlogPostSchema);
module.exports = Blog;

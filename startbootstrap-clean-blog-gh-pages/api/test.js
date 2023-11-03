const mongoose = require("mongoose");
const { BlogPost, Student } = require("../models/BlogPost");
// const { configDotenv } = require("dotenv");
// // Replace 'your_database_url' with your actual MongoDB connection string
const dbURL = "mongodb://localhost/Dozens";
// connecting to the database
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

let BP = BlogPost.create({
  title: "Third post",
  body: "This is the Third blog post for for my project",
});

if (BP) {
  console.log("blog post created successfully");
} else {
  console.log("Oops Error");
}

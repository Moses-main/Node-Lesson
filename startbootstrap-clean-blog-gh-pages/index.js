const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { BlogPost, Student } = require("./models/BlogPost");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs"); // let express use the ejs for templating engine

//
app.get("/dis", async (req, res) => {
  const blogposts = await BlogPost.find({});
  console.log(blogposts);
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  // res.sendFile(path.join(__dirname, "pages", "/about.html"));
  res.render("about");
});

// route for creating post
app.get("/api/posts", (req, res) => {
  res.render("create");
});

// The route for the contact page
app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/index", (req, res) => {
  // res.sendFile(path.join(__dirname, "pages", "/index.html"));
  res.render("index");
});

app.get("/post", (req, res) => {
  // res.sendFile(path.join(__dirname, "pages", "/post.html"));
  res.render("post");
});

// Sendding the post
app.get("/posts/new", async (req, res) => {
  res.render("create");
});

// posting the blog
app.post("/posts/:id", async (req, res) => {
  await BlogPost.create(req.params.id);
  res.render("create");
});

// server listening for changes made on app
app.listen(4000, () => {
  console.log("listening on port 4000");
});

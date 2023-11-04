const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { BlogPost, Student } = require("./models/BlogPost");

// The controllers
const newPostController = require("./controllers/newPost");
const aboutController = require("./controllers/about");
const contactController = require("./controllers/contact");
const postController = require("./controllers/post");
const indexController = require("./controllers/index");

// Middleware for my apps
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs"); // let express use the ejs for templating engine

//  Custom middleware
const customMiddleware = (req, res, next) => {
  console.log(`page shwoing ${req.url}`);
  next();
};
// This checks if the form fields are
const validMiddleware = (req, res, next) => {
  if (req.files == null || req.body.title == null || req.body.title == null) {
    return res.redirect("/posts/new");
  }
  next();
};

app.use(customMiddleware);
app.use("posts/store", validMiddleware);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/posts/new", newPostController);
app.get("/about", aboutController);
app.get("/contact", contactController);
app.get("/post", postController);
app.get("/index", indexController);

app.post("/posts/:id", async (req, res) => {
  await BlogPost.create(req.params.id);
  res.render("create");
});

// server listening for changes made on app
app.listen(4000, () => {
  console.log("listening on port 4000");
});

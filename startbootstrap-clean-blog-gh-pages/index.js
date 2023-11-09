const express = require("express");
const app = express();
// const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const validateMiddleware = require("./middleware/validationMiddleware");

// The controllers
const newPostController = require("./controllers/newPost");
const aboutController = require("./controllers/about");
const contactController = require("./controllers/contact");
const postController = require("./controllers/post");
const indexController = require("./controllers/index");
const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");

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
app.use(customMiddleware);
app.use("posts/store", validateMiddleware);

// GET request
app.get("/posts/new", newPostController);
app.get("/about", aboutController);
app.get("/contact", contactController);
app.get("/post", postController);
app.get("/index", indexController);
app.get("/", homeController);
app.get("/post/:id", getPostController);
app.get("/post/store", storePostController);
app.get("/auth/register", newUserController);
// app.get(" /auth/register");
// for submitting the new user registration details
app.post("/submit", storeUserController);

app.listen(4000, () => {
  console.log("listening on port 4000");
});

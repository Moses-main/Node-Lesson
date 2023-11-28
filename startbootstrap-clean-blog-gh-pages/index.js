const express = require("express");
const app = express();
const router = express.Router();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
// const flash = require("connect-flash");
// const cookieParser = require("cookie-parser");
// const flash = require("express-flash");
// const validateMiddleware = require("./middleware/validationMiddleware");
const expressSession = require("express-session");
const routes = require("./routes");
// The controllers
const newPostController = require("./controllers/newPost");
const aboutController = require("./controllers/about");
const contactController = require("./controllers/contact");
const postController = require("./controllers/post");
const indexController = require("./controllers/index");
const homeController = require("./controllers/home");
// const storePostController = require("./controllers/storePost");
// const getPostController = require("./controllers/getPost");
const newUserController = require("./controllers/newUser");
const loginController = require("./controllers/login");
const userController = require("./controllers/storeUser"); // load route for storing controllers
const loginUserController = require("./controllers/loginUser"); // load route for storing
const dashboardController = require("./controllers/dashboard");
const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");
const logoutController = require("./controllers/logout");
const newBlogController = require("./controllers/blogController");

// IMPORTING THE FLASH PACKAGE FROM EXPRESS
const flash = require("connect-flash");
// app.use(flash());

//Registering Middleware for my apps

global.loggedIn = null;
app.use("*", (req, res, next) => {
  // loggedIn = req.sessionID;
  loggedIn = res.cookie("signupCookie", "userToken", {
    maxAge: 36000,
    httpOnly: true,
  });
  next();
});

app.use(flash()); // app.use(errorHandlerMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use((error, req, res, next) => {
  res.render("register", { error: error.message });
});

app.use(
  expressSession({
    name: "sessionID",
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.set("view engine", "ejs"); // let express use the ejs for templating engine
//  Custom middleware
const customMiddleware = (req, res, next) => {
  console.log(`page shwoing ${req.url}`);
  next();
};

// This checks if the form fields are
app.use(customMiddleware);
// app.use("posts/store", validateMiddleware);

app.use("/", routes);
app.use("/users", userController);
// app.use("./routes", routes);

// GET request
app.get("/posts/new", authMiddleware, newPostController);
app.get("/about", aboutController);
app.get("/contact", contactController);
app.get("/post", postController);
app.get("/index", indexController);
app.get("/", homeController);
// app.get("/post/:id", getPostController);
// app.get("/post/store", storePostController);
app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);
app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);
app.get("/dashboard", dashboardController);
app.get("/auth/logout", logoutController);
// app.use((req, res) => res.render("notfound")); // used to render 404 page

router.get("/", newBlogController.getHomePage);

// router.post("/create_post", newBlogController.createPost);
module.exports = router;

app.listen(4000, () => {
  console.log("listening on port 4000");
});

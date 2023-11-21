const BlogPost = require("../models/posts");

module.exports = async (req, res) => {
  const blogposts = await BlogPost.find({});
  console.log(req.sessionID + " is the users id from the database");
  res.render("dashboard", { blogposts });
};

const BlogPost = require("../models/posts");

module.exports = async (req, res) => {
  const blogposts = await BlogPost.find({}).populate("userid");
  res.render("index", blogposts);
};

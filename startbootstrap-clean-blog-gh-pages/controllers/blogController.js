const { request } = require("express");
const BlogPost = require("../models/posts");

exports.getHomePage = async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.render("index", { posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPost = async (req, res) => {
  const { postTitle, postContent } = req.body;

  if (!postContent && !postTitle) {
    return res.render("create", { error: "No Title and Content found" });
  } else if (!postTitle && postContent) {
    return res.render("create", {
      error: "Please a blog title",
    });
  } else if (!postContent && !postTitle) {
    return res.render("create", { error: "Oops no blog content" });
  } else {
    try {
      const existingTitle = await BlogPost.findOne({ postTitle });

      if (existingTitle) {
        return res.render("create", {
          error:
            "A blog with title '" +
            existingTitle.postTitle +
            "' already exists'",
        });
      }
      // for saving the image sent to the database
      // const imgUrl = req.file.path;

      const newBlog = new BlogPost({
        postTitle: postTitle,
        postContent: postContent,
        // imgUrl: imgUrl,
      });

      if (req.cookies?.jwt) {
        await newBlog.save();
        const blogs = await BlogPost.find({});
        res.render("blogPage", { blogs });

        // res.json(blogs);
      } else {
        return res.status(200).json({ message: "Cookie Not Known" });
      }
    } catch (error) {
      return res.render("create", {
        error: error.message,
      });
    }
  }
};

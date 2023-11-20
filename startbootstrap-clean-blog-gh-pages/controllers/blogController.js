// const Blog = require("../models/blog");

// exports.getHomePage = async (req, res) => {
//   try {
//     const blogs = await Blog.find().sort({ createdAt: "desc" }); //get the last blog
//     res.render("index", blogs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// exports.createPost = async (req, res) => {
//   const { title, body } = req.body;

//   try {
//     // const newBlog = new Blog(title, body, img);
//     const newPost = await Blog.create({ title: title, body: body });
//     // await newBlog.save();
//     if (newPost) {
//       console.log("post created successfully");
//     } else {
//       console.log("Unable to create post");
//     }
//     // res.status(200).json({
//     //   message: "Blog post created successfully",
//     //   postMessage: newPost,
//     // });
//     res.redirect("/");
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// exports.getAllPosts = async (req, res) => {
//   try {
//     const posts = await Blog.find();
//     res.status(200).json({ posts: posts });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// blogController.js - Controller

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

  if (!postTitle || !postContent) {
    return res
      .status(400)
      .json({ ërror: "Please provide a title and a content" });
  } else {
    try {
      const existingTitle = await BlogPost.findOne({ postTitle });
      if (existingTitle) {
        return res.status(400).json({
          error: "A blog with title '" + existing + "already exists'",
        });
      }

      const newBlog = new BlogPost({
        postTitle: postTitle,
        postContent: postContent,
      });
      await newBlog.save();
      // res.redirect("/");
      return res.status(200).json({ message: "Blog created succesfully" });

      // const newBlog = new BlogPost({ postTitle, postContent });
      // await newBlog.save();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

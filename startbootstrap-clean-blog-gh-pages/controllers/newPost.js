module.exports = (req, res) => {
  if (req.sessionID) {
    return res.render("create");
  }
  res.redirect("/auth/login");
};

// const BlogPost = require("../models/posts");
// module.exports = (req, res) => {
//   let image = req.files.image;
//   image.mv(
//     path.join(__dirname, "..", "public/image", image.name),
//     async (error) => {
//       await BlogPost.create({
//         ...req.body,
//         image: "/img/" + image.name,
//       });
//       res.redirect("/");
//     }
//   );
// };

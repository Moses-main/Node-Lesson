module.exports = (req, res) => {
  res.render("create");
};

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

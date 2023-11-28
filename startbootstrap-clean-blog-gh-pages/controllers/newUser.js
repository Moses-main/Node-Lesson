module.exports = (req, res) => {
  req.flash("error", error.message);
  // Render the message.ejs file with the message
  // res.render("register", { error: message });
  res.render("register", { error: error.message });
  // res.render("register");
};

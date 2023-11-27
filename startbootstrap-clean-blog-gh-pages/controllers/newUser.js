module.exports = (req, res) => {
  res.render("register", {
    error: req.session.validationErrors,
  });
};

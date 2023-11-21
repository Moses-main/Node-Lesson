module.exports = (req, res, mext) => {
  if (req.sessionID) {
    return res.redirect("/");
  }
  next();
};

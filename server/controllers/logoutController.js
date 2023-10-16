const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

// const jwt = require("jsonwebtoken");
// require("dotenv").config();

const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  // On client, also delete the AccessToken
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); // no content
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }
  // Delete the refreshToken in the db
  const othersUsers = usersDB.users.filter(
    (person) => person.refreshToken !== refreshToken
  );

  const currentUser = { ...foundUser, othersUsers };
  usersDB.setUsers([...othersUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users"),
    JSON.stringify(usersDB.users)
  );

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); //secure: true -> only serves on https
  res.sendStatus(204);
};

module.exports = { handleLogout };

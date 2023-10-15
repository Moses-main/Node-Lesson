const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

// const path = require("path");
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(400).json({
      message: [
        "Username and password are required",
        "pwd for password",
        "user for username",
      ],
    });
  const foundUser = usersDB.users.find((person) => person.username === user);

  if (!foundUser) return res.sendStatus(401); //Unauthorized
  //evaluate paswords
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // Create a JWT token
    res.json({ Success: `User ${user} is logged in successfully` });
    console.log(JSON.stringify(`User ${user} is logged in successfully`));
  } else {
    res.sendStatus(401).json({ message: e.message });
  }
};

module.exports = { handleLogin };

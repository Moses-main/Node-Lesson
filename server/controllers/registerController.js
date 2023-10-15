const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

// const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");
const { writeFile } = require("fs/promises");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(400).json({
      message: [
        "Username and password are required",
        "pwd for password",
        "user for username",
      ],
    });

  // Check for duplicate username in the database
  const duplicate = usersDB.users.find((person) => person.username === user);
  if (duplicate)
    return (
      res
        // .sendStatus(409) // A conflict occured
        .json({ message: "Duplicate username" })
    );

  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // store the new user
    const newUser = { username: user, password: hashedPwd };

    // update the users array within the usersDB
    usersDB.setUsers([...usersDB.users, newUser]);

    const filePath = path.join(__dirname, "..", "model", "users.json");

    await writeFile(filePath, JSON.stringify(usersDB.users));
    console.log(usersDB.users);
    res
      .status(200)
      .json({ message: `New Users: ${user} created successfully` });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = { handleNewUser };

const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");

const test = (req, res) => {
  res.json("test is working");
};

//Register EndPoint

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Check If Name Was Entered
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }

    //Check If Password Is Good
    if (!password || password.length < 6) {
      return res.json({
        error: "password is required and should be at least 6 character long",
      });
    }

    //Chech Email Is Exist OR Not.

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email Is Taken Already",
      });
    }

    const hashedPassword = await hashPassword(password);

    // Create User In Database

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

//Login Endpoint

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check If User Exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No User Found",
      });
    }

    //Check If Password Is Matched
    const match = await comparePassword(password, user.password);
    if (match) {
      res.json("passwored matched");
    }
    if (!match) {
      res.json({
        error: "password did Not Match",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
};

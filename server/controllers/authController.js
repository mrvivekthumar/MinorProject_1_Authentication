// This Is component is doing register && Login (Validation).

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

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }

    // Check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Password did not match" });
    }

    // Success: return user or token
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};


module.exports = {
  test,
  registerUser,
  loginUser,
};

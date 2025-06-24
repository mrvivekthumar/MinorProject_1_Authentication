// This Is component is doing register && Login (Validation).

const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");

const test = (req, res) => {
  res.json({ message: "Auth route is working" });
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
      password: hashedPassword
    });

    // return res.json(user);

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Error registering user",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

//Login Endpoint

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Success: return user or token
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: user.toJSON()
      //both are same
      // user: {
      //  id: user._id,
      //  name: user.name,
      //  email: user.email,
      //},
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Error logging in",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};


module.exports = {
  test,
  registerUser,
  loginUser,
};

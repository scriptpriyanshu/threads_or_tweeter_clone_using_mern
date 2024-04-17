const User = require("../models/register_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authenticateUser = require("../middlewares/authentication");
const dotenv = require("dotenv");
dotenv.config();

const Home = (req, res) => {
  res.send("Hello Home!");
};

const Register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ error: "Email Already Registered!" });
    }

    const newUser = await User.create({ email, password, username });

    const secretKey = process.env.JWT_SECRET_KEY;

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      secretKey,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({ msg: "Registered!", newUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ error: "Please Register First" });
    }

    const isPasswordMatch = await bcrypt.compare(password, userExist.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const secretKey = process.env.JWT_SECRET_KEY;

    const token = jwt.sign(
      { id: userExist._id, email: userExist.email },
      secretKey,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({ msg: "Logged In!", userExist, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  }
};

const UserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const userExist = await User.findById(userId);
    const { email, username, _id } = userExist;
    res.status(200).json({ email, username, _id });
  } catch (error) {
    res.status(500).json({ error: "Internal server error!" });
  }
};

module.exports = {
  Home,
  Register,
  Login,
  UserProfile,
};

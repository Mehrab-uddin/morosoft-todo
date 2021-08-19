import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

const router = express.Router();
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "user already exist" });
    }
    user = new User({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, "mehrab123", { expiresIn: "5 days" }, (err, token) => {
      if (err) {
        throw err;
      }
      res.json({
        token,
      });
    });
  } catch (error) {
    res.status(500).json("server error");
  }
});

//login function
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user && user.matchPassword(password)) {
      res.status(200).json({ name: user.name, token: generateToken(user._id) });
      console.log("happenings");
    }

    if (!user || !(await user.matchPassword(password))) {
      res.status(401).json({ message: "Invalid credentialss" });
    }
  } catch (error) {
    res.status(500).json("server error");
  }
});

export default router;

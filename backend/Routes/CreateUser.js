const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtSecret = "MynameisEndtoEndYouTubeChannel$#";

const hashPassword = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.hashedPassword = hashedPassword;
    next();
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

router.post(
  "/createUser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Password must be at least 5 characters long").isLength({
      min: 5,
    }),
    body("location").notEmpty(),
  ],
  hashPassword,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newUser = await User.create({
        name: req.body.name,
        password: req.hashedPassword,
        email: req.body.email,
        location: req.body.location,
      });

      console.log("User created successfully:", req.body.email);
      res.json({ success: true, user: newUser });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

router.post(
  "/loginUser",
  [
    body("email").isEmail(),
    body("password", "Password must be at least 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const userData = await User.findOne({ email });
      if (!userData) {
        console.log("User not found with email:", email);
        return res
          .status(400)
          .json({ errors: ["Incorrect email or password"] });
      }

      const passwordMatch = await bcrypt.compare(password, userData.password);

      if (!passwordMatch) {
        console.log("Password does not match");
        return res
          .status(400)
          .json({ errors: ["Incorrect email or password"] });
      }

      console.log("Login successful for user:", email);

      const tokenData = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(tokenData, jwtSecret, { expiresIn: "1h" });
      console.log(authToken);
      return res.json({
        success: true,
        authToken,
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

module.exports = router;

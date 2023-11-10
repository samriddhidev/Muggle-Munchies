const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

router.post(
  "/CreateUser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Incorrect Password").isLength({ min: 5 }),
    body("location").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        location: req.body.location,
      });

      console.log("User created successfully:", req.body.email);
      res.json({ success: true });
    } catch (error) {
      console.error("Error creating user:", error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginUser",
  [
    body("email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        console.log("User not found with email:", email);
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials" });
      }

      console.log("Received login request with data:", req.body);
      console.log("Hashed Password in Database:", userData.password);

      const passwordMatch = await bcrypt.compare(
        req.body.password,
        userData.password
      );

      if (!passwordMatch) {
        console.log("Password does not match");
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials" });
      }

      console.log("Login successful for user:", email);
      return res.json({ success: true });
    } catch (error) {
      console.error("Error during login:", error);
      res.json({ success: false });
    }
  }
);

module.exports = router;

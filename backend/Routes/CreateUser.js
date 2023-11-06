const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/CreateUser", async (req, res) => {
  try {
    if (!req.body.name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }

    if (!req.body.email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    if (!req.body.password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }

    if (!req.body.location) {
      return res
        .status(400)
        .json({ success: false, message: "Location is required" });
    }

    await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      location: req.body.location,
    });

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

module.exports = router;

const express = require("express");
const authRouter = express.Router();
const { validatorSignup } = require("../utils/validator");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req, res) => {
  try {
    validatorSignup(req);
    const { firstName, lastName, emailID, age, gender } = req.body;
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    //   console.log(hashPassword);
    const user = new User({
      firstName,
      lastName,
      emailID,
      password: hashPassword,
      age,
      gender,
    });
    const savedUser = await user.save();
const token = await jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    //  console.log(token);
res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 24 * 60 * 60 * 1000,
});


    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailID, password } = req.body;
    const validUser = await User.findOne({ emailID: emailID });
    if (!validUser) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      validUser.password,
    );
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Invalid credentials" });
    } else {
      const token = await jwt.sign({ _id: validUser._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      //  console.log(token);
   res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 24 * 60 * 60 * 1000,
});

      res.json({ message: "Login successful", user: validUser });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(0) });
  res.json({ message: "Logout successful" });
});

module.exports = authRouter;

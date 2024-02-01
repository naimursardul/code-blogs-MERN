import mongoose from "mongoose";
import User from "../models/user.js";
import { hash } from "../helper/utilities.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// register
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({
      username,
      email,
      password: hash(password),
    });
    await newUser.save();
    delete newUser._doc.password;
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

// login
export const loginUser = async (req, res) => {
  try {
    const newUser = await User.findOne({ email: req.body.email });
    if (newUser) {
      if (hash(req.body.password) === newUser.password) {
        delete newUser._doc.password;
        const token = jwt.sign(newUser._doc, process.env.SECRET, {
          expiresIn: "3d",
        });
        res.cookie("token", token).status(200).json(newUser);
      } else {
        res.status(401).json({ message: "Wrong Password!" });
      }
    } else {
      res.status(404).json({
        message: "No email found! Please, try with different email address.",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// logout
export const logOutUser = async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .json({ message: "User logged out successfully!" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// REFETCH USER
export const refetchUser = async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, data) => {
      if (err) {
        res.status(403).json({ message: "Token is not valid!" });
      } else {
        res.status(200).json(data);
      }
    });
  } else {
    return res.status(401).json({ messaage: "You are not authenticated!" });
  }
};

import { hash } from "../helper/utilities.js";
import User from "../models/user.js";
import Post from "../models/post.js";
import Comment from "../models/comment.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import fs from "fs/promises";

dotenv.config();

// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = hash(req.body.password);
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    const token = jwt.sign(updatedUser._doc, process.env.SECRET, {
      expiresIn: "3d",
    });
    res
      .cookie("token", token, { overwrite: true })
      .status(200)
      .json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete all file from user
export const deleteUserAllFile = async (req, res, next) => {
  try {
    const userPosts = await Post.find({ userId: req.params.id });
    userPosts.map(async (uPost) => {
      const post = await Post.findById(uPost._id);
      const photoUrl = post?.photo;
      const fileName = photoUrl.replace(
        `${process.env.BACKEND_URL}${process.env.UPLOADS_ROUTE}/`,
        ""
      );
      const directoryName = path.join(process.env.UPLOADS_DIRECTORY, fileName);
      await fs.unlink(directoryName);
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    await Post.deleteMany({ userId: req.params.id });
    await Comment.deleteMany({ userId: req.params.id });
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .json({ message: "User is deleted successfully!" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET USER
export const getSingleUser = async (req, res) => {
  try {
    const selectedUser = await User.findById(req.params.id);
    delete selectedUser._doc.password;
    res.status(200).json(selectedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

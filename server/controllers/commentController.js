import mongoose from "mongoose";
import Comment from "../models/comment.js";

// CREATE COMMENT
export const createComment = async (req, res) => {
  try {
    const createdComment = await Comment.create(req.body);
    await createdComment.save();
    res.status(200).json(createdComment);
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE COMMENT
export const updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json(error);
  }
};

// DELETE COMMENT
export const deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Comment has been deleted successfully!" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET ALL COMMENTS FROM SINGLE POST
export const getAllComment = async (req, res) => {
  try {
    const postAllComment = await Comment.find({
      postId: req.params.postId,
    }).sort({ createdAt: 1 });
    res.status(200).json(postAllComment);
  } catch (error) {
    res.status(500).json(error);
  }
};

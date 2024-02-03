import Comment from "../models/comment.js";
import Post from "../models/post.js";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import fs from "fs/promises";

dotenv.config();

// CREATE POST
export const createPost = async (req, res) => {
  try {
    const createdPost = await Post.create(req.body);
    await createdPost.save();
    res.status(200).json(createdPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE POST
export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// // DELETE file
// export const deleteFile = async (req, res) => {
//   try {
//     const photoUrl = req.body.imageUrl;
//     const fileName = photoUrl.replace(
//       `${process.env.BACKEND_URL}${process.env.UPLOADS_ROUTE}/`,
//       ""
//     );
//     const directoryName = path.join(process.env.UPLOADS_DIRECTORY, fileName);
//     await fs.unlink(directoryName);
//     res.status(200).json({ message: "Successfully Deleted!" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// };

// DELETE file from selected post
export const deletePostFile = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    const photoUrl = post?.photo;
    const fileName = photoUrl.replace(
      `${process.env.BACKEND_URL}${process.env.UPLOADS_ROUTE}/`,
      ""
    );
    const directoryName = path.join(process.env.UPLOADS_DIRECTORY, fileName);
    await fs.unlink(directoryName);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// DELETE POST
export const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ postId: req.params.id });
    res.status(200).json({ message: "Post has been deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
// // DELETE POST
// export const deletePost = async (req, res) => {
//   try {
//     await Post.findByIdAndDelete(req.params.id);
//     await Comment.deleteMany({ postId: req.params.id });
//     res.status(200).json({ message: "Post has been deleted successfully!" });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// GET A POST DETAILS
export const getSinglePost = async (req, res) => {
  try {
    const singlePost = await Post.findById(req.params.id);
    res.status(200).json(singlePost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET ALL POSTS FROM SINGLE USER
export const getUserPost = async (req, res) => {
  try {
    const userPost = await Post.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(userPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET ALL + Searched POSTS
export const getAllPost = async (req, res) => {
  try {
    const query = req.query;
    const searchFilter = { title: { $regex: query.search, $options: "i" } };
    const allPost = await Post.find(query.search ? searchFilter : {}).sort({
      createdAt: -1,
    });
    res.status(200).json(allPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// MULTER

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOADS_DIRECTORY);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname.replace(fileExt, "").split(" ").join("-") +
      "-" +
      Date.now() +
      fileExt;
    req.fileName = fileName;
    cb(null, fileName);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // 5mb
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else cb(new Error("Only .jpg or .jpeg or .png format allowed"));
  },
});

export const uploadFile = async (req, res) => {
  try {
    const imageUrl = `${process.env.BACKEND_URL}${process.env.UPLOADS_ROUTE}/${req.fileName}`;
    res.status(200).json({ imageUrl });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

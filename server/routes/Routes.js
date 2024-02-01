import express from "express";
import {
  logOutUser,
  loginUser,
  registerUser,
  refetchUser,
} from "../controllers/authController.js";
import {
  deleteUser,
  getSingleUser,
  updateUser,
} from "../controllers/userController.js";
import {
  createPost,
  deletePost,
  getAllPost,
  getSinglePost,
  getUserPost,
  updatePost,
  upload,
  uploadFile,
} from "../controllers/postController.js";
import {
  createComment,
  deleteComment,
  getAllComment,
  updateComment,
} from "../controllers/commentController.js";
import verifyToken from "../verifyToken.js";

const route = express.Router();

route.post("/register", registerUser); // REGISTER USER
route.post("/login", loginUser); // LOGIN USER
route.get("/logout", logOutUser); // LOGOUT USER
route.get("/refetch", refetchUser); // REFETCH USER

route.put("/user/:id", verifyToken, updateUser); // UPDATE USER
route.delete("/user/:id", verifyToken, deleteUser); // DELETE USER
route.get("/user/:id", getSingleUser); // GET USER

route.post("/post/write", createPost); // CREATE POST
route.put("/post/:id", verifyToken, updatePost); // UPDATE POST
route.delete("/post/:id", verifyToken, deletePost); // DELETE POST
route.get("/post/:id", getSinglePost); // GET A POST DETAILS
route.get("/post/user/:userId", getUserPost); // GET ALL POSTS FROM SINGLE USER
route.get("/post", getAllPost); // GET ALL + Searched POSTS
route.post("/upload", upload.single("file"), uploadFile);

route.post("/comment", verifyToken, createComment); // CREATE COMMENT
route.put("/comment/:id", verifyToken, updateComment); // UPDATE COMMENT
route.delete("/comment/:id", verifyToken, deleteComment); // DELETE COMMENT
route.get("/comment/post/:postId", getAllComment); // GET ALL COMMENTS FROM SINGLE POST

export default route;

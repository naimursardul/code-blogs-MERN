import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  // console.log("token " + token);
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err) => {
      if (err) {
        res.status(403).json({ message: "Token is not valid!" });
      } else {
        next();
      }
    });
  } else {
    return res.status(401).json({ messaage: "You are not authenticated!" });
  }
};

export default verifyToken;

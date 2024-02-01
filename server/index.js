import express from "express";
import Connection from "./database/db.js";
import cors from "cors";
import Routes from "./routes/Routes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use(process.env.UPLOADS_ROUTE, express.static(process.env.UPLOADS_URL));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/", Routes);
Connection();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

export const hash = (str) => {
  const hash = crypto
    .createHmac("sha256", process.env.SECRET)
    .update(str)
    .digest("hex");

  return hash;
};

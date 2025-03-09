import * as jwt from "jsonwebtoken";
import * as env from "dotenv";

env.config();

const secretKey = process.env.AUTH_SECRET ?? "";

const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    throw err;
  }
};

const createToken = (data: any) =>
  jwt.sign({ data }, secretKey, { expiresIn: "1d" });

export { verifyToken, createToken };

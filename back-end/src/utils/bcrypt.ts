import bcrypt from "bcryptjs";
import env from "dotenv";

env.config();

const saltRound = Number(process.env.BCRYPT_SALT ?? 10);
const encryptPassword = async (data: string) => {
  const salt = await bcrypt.genSalt(saltRound);
  return await bcrypt.hash(data, salt);
};

const comparePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export { encryptPassword, comparePassword };

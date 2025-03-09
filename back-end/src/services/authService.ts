import { Request, Response } from "express";
import { handleException } from "../exceptions/handleException";
import UnAuthorizedException from "../types/exceptions/unAuthorizeException";
import ExistedUserException from "../types/exceptions/existedUserException";
import { signInSchema } from "../libs/zodSchema/signInSchema";
import { signUpSchema } from "../libs/zodSchema/signUpSchema";
import { comparePassword, encryptPassword } from "../utils/bcrypt";
import { createToken } from "../utils/jwtUtil";
import { getUserByEmailOrPhone } from "./userService";

const SignIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedCredentials = signInSchema.parse(req.body);

    const existingUser = await getUserByEmailOrPhone(parsedCredentials.email);

    if (!existingUser) {
      throw new UnAuthorizedException("Wrong email or password");
    }

    const isPasswordMatched = await comparePassword(
      parsedCredentials.password,
      existingUser.password!
    );

    if (!isPasswordMatched)
      throw new UnAuthorizedException("Wrong email or password");

    if (!existingUser.emailVerified) {
      throw new UnAuthorizedException("Email is not verified");
    }

    const { password, ...jwtData } = existingUser;

    const jwtToken = createToken(jwtData);

    res.status(200).json({
      type: "Bearer",
      token: jwtToken,
    });
  } catch (err) {
    handleException(err, res);
  }
};

const SignUp = async (req: Request, res: Response) => {
  try {
    const parsedCredentials = signUpSchema.parse(req.body);

    const existingUser = await getUserByEmailOrPhone(parsedCredentials.email);
    if (existingUser) throw new ExistedUserException(parsedCredentials.email);
    const { address, age, email, firstName, lastName, password, phoneNumber } =
      parsedCredentials;

    const hashedPassword = await encryptPassword(password);
    const fullName = `${firstName} ${lastName}`;

    // Do not save

    // const user = await prisma.user.create({
    //   data: {
    //     name: fullName,
    //     email: email,
    //     age: String(age),
    //     phone: String(phoneNumber),
    //     address: address,
    //     password: hashedPassword,
    //   },
    // });

    const user = {
      name: fullName,
      email: email,
      age: String(age),
      phone: String(phoneNumber),
      address: address,
    };

    const token = createToken(user);

    res.status(201).json({
      type: "Bearer",
      token: token,
    });
  } catch (error) {
    handleException(error, res);
  }
};

const VerifyToken = async (req: Request, res: Response) => {};

export default { SignIn, SignUp, VerifyToken };

import { Request, Response } from "express";
import { handleException } from "../exceptions/handleException";
import { signInSchema } from "../libs/zodSchema/signInSchema";
import { signUpSchema } from "../libs/zodSchema/signUpSchema";
import { comparePassword, encryptPassword } from "../utils/bcrypt";
import { createJWTToken } from "../utils/jwtUtil";
import { createVerifyToken } from "./tokenService";
import { getUserByEmailOrPhone } from "./userService";
import { prisma } from "../libs/db";
import { sendEmail } from "../utils/sendEmail";
import UnAuthorizedException from "../types/exceptions/unAuthorizeException";
import ExistedUserException from "../types/exceptions/existedUserException";
import MissingFieldValue from "../types/exceptions/missingFieldValue";

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
      const newToken = await createVerifyToken(existingUser.email);
      if (newToken?.token) {
        sendEmail({
          firstName: existingUser.name ?? "N/a",
          to: existingUser.email,
          token: newToken?.token,
        });
        throw new UnAuthorizedException("Email is not verified", true);
      }
      throw new UnAuthorizedException("Email is not verified");
    }

    const { password, ...jwtData } = existingUser;

    const jwtToken = createJWTToken(jwtData);

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

    const user = await prisma.user.create({
      data: {
        name: fullName,
        email: email,
        age: String(age),
        phone: String(phoneNumber),
        address: address,
        password: hashedPassword,
      },
    });

    const verifyToken = await createVerifyToken(user.email);

    if (verifyToken && user) {
      console.log("before sending email");
      await sendEmail({
        firstName: user.name!,
        to: user.email,
        token: verifyToken.token,
      });
    }

    res.status(201).json({
      data: null,
      message:
        "Account created successfully, please check your email to verify",
    });
  } catch (error) {
    handleException(error, res);
  }
};

const VerifyToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    if (!token) {
      throw new MissingFieldValue("Token");
    }
  } catch (error) {
    handleException(error, res);
  }
};

export default { SignIn, SignUp, VerifyToken };

import { v4 as uuid } from "uuid";
import { prisma } from "../libs/db";

// create verification token
export const createVerifyToken = async (email: string) => {
  try {
    // check if token already exists and delete it
    const existingToken = await getTokenByEmail(email);
    if (existingToken) {
      await prisma.verificationToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }
    const token = uuid();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    // create verification token
    const userToken = await prisma.verificationToken.create({
      data: {
        email: email,
        token: token,
        expires: expires,
      },
    });
    return userToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// find verification token by email
export const getTokenByEmail = async (email: string) => {
  try {
    const userToken = await prisma.verificationToken.findFirst({
      where: {
        email: email,
      },
    });

    return userToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// find verification token by token
export const getTokenByToken = async (token: string) => {
  try {
    const userToken = await prisma.verificationToken.findUnique({
      where: {
        token: token,
      },
    });

    return userToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};

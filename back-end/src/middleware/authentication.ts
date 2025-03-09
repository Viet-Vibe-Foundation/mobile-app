import { verifyToken } from "../utils/jwtUtil";
import UnAuthorizedException from "../types/exceptions/unAuthorizeException";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

export const authenticateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new UnAuthorizedException("No token provided"));
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded: string | JwtPayload = verifyToken(token);
    if (!decoded) {
      return next(new UnAuthorizedException("Access denied"));
    }

    console.log(decoded);
    next();
  } catch (err) {
    next(err);
  }
};

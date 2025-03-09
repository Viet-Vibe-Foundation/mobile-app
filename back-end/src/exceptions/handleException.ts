import { Response } from "express";
import GlobalException from "../types/exceptions/globalException";
import { ZodError } from "zod";

export const handleException = (error: unknown, res: Response) => {
  if (error instanceof GlobalException) {
    res.status(error.statusCode).json({
      message: error.message,
      name: error.name,
      time: error.timestamp,
    });
  } else if (error instanceof ZodError) {
    res.status(400).json({
      message: error.errors,
      name: error.name,
      time: new Date(),
    });
  } else {
    res.status(500).json({
      message: `Internal Server Error ${error}`,
      name: "Un-expected",
      time: new Date(),
    });
  }
};

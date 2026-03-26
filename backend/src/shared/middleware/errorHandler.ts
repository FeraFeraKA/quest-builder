import type { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";
import { HttpError } from "../error/httpError";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      error: {
        code: err.code,
        message: err.message,
      },
    });
  } else if (err instanceof ZodError) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: err.message,
        details: z.treeifyError(err),
      },
    });
  } else {
    return res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Internal Server Error",
      },
    });
  }

  (void req, next);
}

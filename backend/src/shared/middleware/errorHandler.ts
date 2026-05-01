import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HttpError } from "../error/httpError.js";
import { clearAuthCookies } from "../helpers/authCookies.js";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);
  if (err instanceof HttpError) {
    if (
      err.status === 401 &&
      ["/auth/refresh", "/auth/logout"].includes(req.originalUrl)
    ) {
      clearAuthCookies(res);
    }

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
        message: err.issues[0]?.message,
        details: err.issues,
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

import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../error/httpError";
import { verifyRefreshToken } from "../lib/jwt";

export function authGuard(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new HttpError(401, "UNAUTHORIZED", "Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new HttpError(401, "UNAUTHORIZED", "Unauthorized");
  }

  let user;

  try {
    user = verifyRefreshToken(token);
  } catch (e) {
    throw new HttpError(401, "UNAUTHORIZED", "Unauthorized");
  }

  req.user = { id: user.id, nickname: user.id };

  next();

  void res;
}

import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../error/httpError";
import { verifyAccessToken } from "../lib/jwt";

export function authGuard(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies["accessToken"];

  if (!token) {
    throw new HttpError(401, "UNAUTHORIZED", "Unauthorized");
  }

  let user;

  try {
    user = verifyAccessToken(token);
  } catch (e) {
    throw new HttpError(401, "UNAUTHORIZED", "Unauthorized");
  }

  req.user = { id: user.id, nickname: user.id };

  next();

  void res;
}

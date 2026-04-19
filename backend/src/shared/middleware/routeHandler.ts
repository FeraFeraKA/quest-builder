import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../error/httpError.js";

export function routeHandler(req: Request, res: Response, next: NextFunction) {
  next(new HttpError(404, "NOT_FOUND", "Route not found"));
  (void req, res);
}

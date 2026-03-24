import type { Request, Response } from "express";
import RegisterLoginSchema from "./auth.schema";
import { AuthService } from "./auth.service";

export const AuthController = {
  async register(req: Request, res: Response) {
    const body = RegisterLoginSchema.parse(req.body);
    const user = await AuthService.register(body);
    res.json(user).status(201);
  },

  async login(req: Request, res: Response) {
    const body = RegisterLoginSchema.parse(req.body);
    const user = await AuthService.login(body);
    res.json(user).status(200);
  },
};

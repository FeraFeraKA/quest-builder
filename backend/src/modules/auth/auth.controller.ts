import type { Request, Response } from "express";
import RegisterLoginSchema from "./auth.schema";
import { AuthService } from "./auth.service";

export const AuthController = {
  async register(req: Request, res: Response) {
    const body = RegisterLoginSchema.parse(req.body);
    const user = await AuthService.register(body);
    res.status(201).json(user);
  },

  async login(req: Request, res: Response) {
    const body = RegisterLoginSchema.parse(req.body);
    const user = await AuthService.login(body);
    res.status(200).json(user);
  },

  async me(req: Request, res: Response) {
    const userId = req.user?.id;
    const user = await AuthService.me(userId);
    res.status(200).json(user);
  }
};

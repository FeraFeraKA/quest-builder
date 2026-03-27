import type { Request, Response } from "express";
import { RefreshTokenSchema } from "../token/token.schema";
import RegisterLoginSchema from "./auth.schema";
import { AuthService } from "./auth.service";

export const AuthController = {
  async register(req: Request, res: Response) {
    const body = RegisterLoginSchema.parse(req.body);
    const userDb = await AuthService.register(body);
    res
      .status(201)
      .cookie("accessToken", userDb.accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", userDb.refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json(userDb.user);
  },

  async login(req: Request, res: Response) {
    const body = RegisterLoginSchema.parse(req.body);
    const userDb = await AuthService.login(body);
    res
      .status(200)
      .cookie("accessToken", userDb.accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", userDb.refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json(userDb);
  },

  async me(req: Request, res: Response) {
    const userId = req.user.id;
    const user = await AuthService.me(userId);
    res.status(200).json(user);
  },

  async logout(req: Request, res: Response) {
    const { refreshToken } = RefreshTokenSchema.parse(req.body);
    const success = await AuthService.logout(refreshToken);
    res.status(200).json(success);
  },

  async refresh(req: Request, res: Response) {
    const { refreshToken } = RefreshTokenSchema.parse(req.body);
    const tokens = await AuthService.refresh(refreshToken);
    res
      .status(200)
      .cookie("accessToken", tokens.accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json(tokens);
  },
};

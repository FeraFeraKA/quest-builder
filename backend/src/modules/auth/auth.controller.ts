import type { Request, Response } from "express";
import {
  accessTokenCookieOptions,
  clearAuthCookies,
  refreshTokenCookieOptions,
} from "../../shared/helpers/authCookies.js";
import { HttpError } from "../../shared/error/httpError.js";
import { RefreshTokenSchema } from "../token/token.schema.js";
import RegisterLoginSchema from "./auth.schema.js";
import { AuthService } from "./auth.service.js";

const getRefreshTokenCookie = (req: Request) => {
  const token = req.cookies["refreshToken"];
  const parsedToken = RefreshTokenSchema.safeParse(token);

  if (!parsedToken.success) {
    throw new HttpError(
      401,
      token ? "INVALID_TOKEN" : "NO_TOKEN",
      "Invalid credentials",
    );
  }

  return parsedToken.data;
};

export const AuthController = {
  async register(req: Request, res: Response) {
    const data = RegisterLoginSchema.parse(req.body);
    const userDb = await AuthService.register(data);
    res
      .status(201)
      .cookie("accessToken", userDb.accessToken, accessTokenCookieOptions)
      .cookie("refreshToken", userDb.refreshToken, refreshTokenCookieOptions)
      .json(userDb.user);
  },

  async login(req: Request, res: Response) {
    const data = RegisterLoginSchema.parse(req.body);
    const userDb = await AuthService.login(data);
    res
      .status(200)
      .cookie("accessToken", userDb.accessToken, accessTokenCookieOptions)
      .cookie("refreshToken", userDb.refreshToken, refreshTokenCookieOptions)
      .json(userDb.user);
  },

  async me(req: Request, res: Response) {
    const userId = req.user.id;
    const user = await AuthService.me(userId);
    res.status(200).json(user);
  },

  async logout(req: Request, res: Response) {
    const refreshToken = getRefreshTokenCookie(req);
    const success = await AuthService.logout(refreshToken);
    clearAuthCookies(res);
    res.status(200).json(success);
  },

  async refresh(req: Request, res: Response) {
    const refreshToken = getRefreshTokenCookie(req);
    const tokens = await AuthService.refresh(refreshToken);
    res
      .status(200)
      .cookie("accessToken", tokens.accessToken, accessTokenCookieOptions)
      .cookie("refreshToken", tokens.refreshToken, refreshTokenCookieOptions)
      .json({ success: true });
  },
};

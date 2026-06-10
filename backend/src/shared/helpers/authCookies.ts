import type { CookieOptions, Response } from "express";

const authCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "none",
  secure: true,
};

export const accessTokenCookieOptions: CookieOptions = {
  ...authCookieOptions,
  maxAge: 60 * 60 * 1000,
};

export const refreshTokenCookieOptions: CookieOptions = {
  ...authCookieOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const clearAuthCookies = (res: Response) => {
  res.clearCookie("accessToken", authCookieOptions);
  res.clearCookie("refreshToken", authCookieOptions);
};

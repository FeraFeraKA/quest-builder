import { config } from "./../../shared/config/env.js";
import { HttpError } from "./../../shared/error/httpError.js";
import {
  signAccessToken,
  signRefreshToken,
  type IJwtPayload,
} from "./../../shared/lib/jwt.js";
import ms from "ms";

export function getTokens(payload: IJwtPayload) {
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  if (!accessToken || !refreshToken) {
    throw new HttpError(401, "INVALID_CREDENTIALS", "Invalid credentials");
  }

  const refreshTokenExpiresAt = new Date(
    Date.now() + ms(config.jwtRefreshExpiresIn),
  );

  return { accessToken, refreshToken, refreshTokenExpiresAt };
}

import jwt from "jsonwebtoken";
import { config } from "../config/env";

type TJwtPayload = jwt.JwtPayload;

type TToken = string;

const jwtAccessSecret = config.jwtAccessSecret;
const jwtRefreshSecret = config.jwtRefreshSecret;

export function signAccessToken(payload: TJwtPayload) {
  return jwt.sign(payload, jwtAccessSecret, {
    expiresIn: config.jwtAccessExpiresIn,
  });
}

export function signRefreshToken(payload: TJwtPayload) {
  return jwt.sign(payload, jwtRefreshSecret, {
    expiresIn: config.jwtRefreshExpiresIn,
  });
}

export function verifyAccessToken(token: TToken): TJwtPayload {
  return jwt.verify(token, jwtAccessSecret) as TJwtPayload;
}

export function verifyRefreshToken(token: TToken): TJwtPayload {
  return jwt.verify(token, jwtRefreshSecret) as TJwtPayload;
}

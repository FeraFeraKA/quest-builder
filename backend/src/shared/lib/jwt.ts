import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export interface IJwtPayload {
  id: string;
  nickname: string;
}

type TToken = string;

const jwtAccessSecret = config.jwtAccessSecret;
const jwtRefreshSecret = config.jwtRefreshSecret;

export function signAccessToken(payload: IJwtPayload) {
  return jwt.sign(payload, jwtAccessSecret, {
    expiresIn: config.jwtAccessExpiresIn,
  });
}

export function signRefreshToken(payload: IJwtPayload) {
  return jwt.sign({ ...payload, jti: crypto.randomUUID() }, jwtRefreshSecret, {
    expiresIn: config.jwtRefreshExpiresIn,
  });
}

export function verifyAccessToken(token: TToken): IJwtPayload {
  return jwt.verify(token, jwtAccessSecret) as IJwtPayload;
}

export function verifyRefreshToken(token: TToken): IJwtPayload {
  return jwt.verify(token, jwtRefreshSecret) as IJwtPayload;
}

import { HttpError } from "./../../shared/error/httpError.js";
import { toSafeUser } from "./../../shared/helpers/safeUser.js";
import { verifyRefreshToken, type IJwtPayload } from "./../../shared/lib/jwt.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import bcrypt from "bcrypt";
import { getTokens } from "../token/getTokens.js";
import { RefreshTokenStorage } from "../token/token.storage.js";
import { AuthStorage } from "./auth.storage.js";
import type { IRegisterLoginData, TToken, TUserId } from "./auth.types.js";

const SALT_ROUNDS = 10;

export const AuthService = {
  async register(data: IRegisterLoginData) {
    const { nickname, password } = data;

    const passwordHash = bcrypt.hashSync(password, SALT_ROUNDS);

    try {
      const user = await AuthStorage.register({ nickname, passwordHash });

      const { accessToken, refreshToken, refreshTokenExpiresAt } = getTokens({
        id: user.id,
        nickname: user.nickname,
      });

      await RefreshTokenStorage.create({
        userId: user.id,
        token: refreshToken,
        expiresAt: refreshTokenExpiresAt,
      });

      return { accessToken, refreshToken, user: toSafeUser(user) };
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2002") {
        throw new HttpError(409, "NICKNAME_TAKEN", "Nickname already taken");
      }
      throw e;
    }
  },

  async login(data: IRegisterLoginData) {
    const { nickname, password } = data;

    const user = await AuthStorage.getByNickname(nickname);

    if (!user) {
      throw new HttpError(401, "UNAUTHORIZED", "Invalid credentials");
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      throw new HttpError(401, "UNAUTHORIZED", "Invalid credentials");
    }

    const { accessToken, refreshToken, refreshTokenExpiresAt } = getTokens({
      id: user.id,
      nickname: user.nickname,
    });

    await RefreshTokenStorage.deleteByMany(user.id);

    await RefreshTokenStorage.create({
      userId: user.id,
      token: refreshToken,
      expiresAt: refreshTokenExpiresAt,
    });

    return { accessToken, refreshToken, user: toSafeUser(user) };
  },

  async me(userId: TUserId) {
    const user = await AuthStorage.getById(userId);

    if (!user) {
      throw new HttpError(401, "UNAUTHORIZED", "Invalid credentials");
    }

    return toSafeUser(user);
  },

  async logout(refreshToken: TToken) {
    if (!refreshToken) {
      throw new HttpError(401, "NO_TOKEN", "Invalid credentials");
    }

    const refreshTokenTable =
      await RefreshTokenStorage.findByToken(refreshToken);

    if (!refreshTokenTable) {
      throw new HttpError(401, "INVALID_TOKEN", "Invalid credentials");
    }

    await RefreshTokenStorage.delete(refreshToken);

    return { success: true };
  },

  async refresh(refreshToken: TToken) {
    if (!refreshToken) {
      throw new HttpError(401, "NO_TOKEN", "Invalid credentials");
    }

    let payload: IJwtPayload;

    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new HttpError(401, "INVALID_TOKEN", "Invalid credentials");
    }

    const refreshTokenTable =
      await RefreshTokenStorage.findByToken(refreshToken);

    if (!refreshTokenTable) {
      throw new HttpError(401, "INVALID_TOKEN", "Invalid credentials");
    }

    const user = await AuthStorage.getById(refreshTokenTable.userId);

    if (!user) {
      throw new HttpError(401, "INVALID_TOKEN", "Invalid credentials");
    }

    await RefreshTokenStorage.delete(refreshToken);

    const {
      accessToken,
      refreshToken: newRefreshToken,
      refreshTokenExpiresAt,
    } = getTokens({ id: payload.id, nickname: payload.nickname });

    await RefreshTokenStorage.create({
      userId: refreshTokenTable.userId,
      token: newRefreshToken,
      expiresAt: refreshTokenExpiresAt,
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  },
};

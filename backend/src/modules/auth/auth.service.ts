import { HttpError } from "@/shared/errors/httpError";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import bcrypt from "bcrypt";
import { AuthStorage } from "./auth.storage";
import type { IRegisterLoginBody, TUserId } from "./auth.types";

const SALT_ROUNDS = 10;

export const AuthService = {
  async register(body: IRegisterLoginBody) {
    const { nickname, password } = body;

    const passwordHash = bcrypt.hashSync(password, SALT_ROUNDS);

    let user;

    try {
      user = await AuthStorage.register({ nickname, passwordHash });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2002") {
        throw new HttpError(409, "EMAIL TAKEN", "Email already taken");
      }
    }

    return user;
  },

  async login(body: IRegisterLoginBody) {
    const { nickname, password } = body;

    const user = await AuthStorage.login(nickname);

    if (!user) throw new HttpError(401, "UNAUTHORIZED", "Invalid credentials");

    const isValid = bcrypt.compare(password, user.passwordHash);

    if (!isValid)
      throw new HttpError(401, "UNAUTHORIZED", "Invalid credentials");

    return user;
  },

  async me(userId: TUserId) {
    const user = await AuthStorage.me(userId);

    if (!user) throw new HttpError(401, "UNAUTHORIZED", "Invalid credentials");

    return user;
  },
};

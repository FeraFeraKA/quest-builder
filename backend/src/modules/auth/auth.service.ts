import bcrypt from "bcrypt";
import { AuthStorage } from "./auth.storage";
import type { RegisterLoginBody } from "./auth.types";

const SALT_ROUNDS = 10;

export const AuthService = {
  async register(body: RegisterLoginBody) {
    const { nickname, password } = body;

    const passwordHash = bcrypt.hashSync(password, SALT_ROUNDS);

    const user = await AuthStorage.register({ nickname, passwordHash });

    if (!user) throw new Error("Error");

    return user;
  },
};

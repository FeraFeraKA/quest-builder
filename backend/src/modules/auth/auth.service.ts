import bcrypt from "bcrypt";
import { AuthStorage } from "./auth.storage";
import type { IRegisterLoginBody } from "./auth.types";

const SALT_ROUNDS = 10;

export const AuthService = {
  async register(body: IRegisterLoginBody) {
    const { nickname, password } = body;

    const passwordHash = bcrypt.hashSync(password, SALT_ROUNDS);

    const user = await AuthStorage.register({ nickname, passwordHash });

    if (!user) throw new Error("Error");

    return user;
  },

  async login(body: IRegisterLoginBody) {
    const { nickname, password } = body;

    const user = await AuthStorage.login(nickname);

    if (!user) throw new Error("Error");

    const isValid = bcrypt.compare(password, user.passwordHash);

    if (!isValid) throw new Error("Error");

    return user;
  },
};

import { AuthStorage } from "./auth.storage";
import type { RegisterLoginBody } from "./auth.types";

export const AuthService = {
  async register(body: RegisterLoginBody) {
    const user = await AuthStorage.register(body);

    if (!user) throw new Error("Error");

    return user;
  },
};

import { prisma } from "@/lib/prisma";
import type { RegisterLoginBody } from "./auth.types";

export const AuthStorage = {
  async register({ nickname, password }: RegisterLoginBody) {
    return prisma.user.create({
      data: {
        nickname,
        password,
      },
    });
  },
};

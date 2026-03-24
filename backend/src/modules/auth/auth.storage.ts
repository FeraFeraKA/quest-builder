import { prisma } from "@/lib/prisma";
import type { RegisterLoginEndpoint } from "./auth.types";

export const AuthStorage = {
  async register({ nickname, passwordHash }: RegisterLoginEndpoint) {
    return prisma.user.create({
      data: {
        nickname,
        passwordHash,
      },
    });
  },
};

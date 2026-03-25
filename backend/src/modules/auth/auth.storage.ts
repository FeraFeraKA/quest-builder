import { prisma } from "@/lib/prisma";
import type { IRegisterLoginEndpoint, TNickname, TUserId } from "./auth.types";

export const AuthStorage = {
  async register({ nickname, passwordHash }: IRegisterLoginEndpoint) {
    return prisma.user.create({
      data: {
        nickname,
        passwordHash,
      },
    });
  },

  async login(nickname: TNickname) {
    return prisma.user.findUnique({
      where: {
        nickname,
      },
    });
  },

  async me(userId: TUserId) {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  },
};

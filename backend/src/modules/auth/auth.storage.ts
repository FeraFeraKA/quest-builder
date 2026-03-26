import { prisma } from "@/shared/lib/prisma";
import type { IRegisterEndpoint, TNickname, TUserId } from "./auth.types";

export const AuthStorage = {
  async register({ nickname, passwordHash }: IRegisterEndpoint) {
    return prisma.user.create({
      data: {
        nickname,
        passwordHash,
      },
    });
  },

  async getByNickname(nickname: TNickname) {
    return prisma.user.findUnique({
      where: {
        nickname,
      },
    });
  },

  async getById(userId: TUserId) {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  },
};

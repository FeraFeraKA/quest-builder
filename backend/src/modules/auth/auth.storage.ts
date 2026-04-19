import { prisma } from "./../../shared/lib/prisma.js";
import type { IRegisterEndpoint, TNickname, TUserId } from "./auth.types.js";

export const AuthStorage = {
  async register(data: IRegisterEndpoint) {
    return prisma.user.create({
      data,
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

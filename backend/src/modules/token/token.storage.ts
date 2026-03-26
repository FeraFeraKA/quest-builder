import { prisma } from "@/shared/lib/prisma";
import type { TToken, TUserId } from "../auth/auth.types";

interface ITokenCreate {
  userId: string;
  token: string;
  expiresAt: Date;
}

export const RefreshTokenStorage = {
  async create(data: ITokenCreate) {
    return prisma.refreshToken.create({
      data,
    });
  },

  async findByToken(token: TToken) {
    return prisma.refreshToken.findUnique({
      where: { token },
    });
  },

  async delete(token: TToken) {
    return prisma.refreshToken.delete({
      where: { token },
    });
  },

  async deleteByMany(userId: TUserId) {
    return prisma.refreshToken.deleteMany({
      where: { userId },
    });
  },
};

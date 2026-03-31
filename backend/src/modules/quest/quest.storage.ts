import { prisma } from "@/shared/lib/prisma";
import type { Prisma } from "generated/prisma/client";
import type { TUserId } from "../auth/auth.types";
import type { IQuestCredentials, IQuestData } from "./quest.types";

export const QuestStorage = {
  async create(data: IQuestData) {
    return prisma.quest.create({
      data,
    });
  },

  async getQuests(userId: TUserId) {
    return prisma.quest.findMany({
      where: {
        userId,
      },
    });
  },

  async getQuest({ questId, userId }: IQuestCredentials) {
    return prisma.quest.findUnique({
      where: {
        id: questId,
        userId,
      },
      include: {
        nodes: true,
        edges: true,
      },
    });
  },

  async update(
    data: Prisma.QuestUncheckedUpdateInput,
    credentials: IQuestCredentials,
  ) {
    return prisma.quest.update({
      where: {
        id: credentials.questId,
        userId: credentials.userId,
      },
      data,
    });
  },

  async delete({ questId, userId }: IQuestCredentials) {
    return prisma.quest.delete({
      where: {
        id: questId,
        userId: userId,
      },
    });
  },
};

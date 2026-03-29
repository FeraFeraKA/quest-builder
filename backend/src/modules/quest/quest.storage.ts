import { prisma } from "@/shared/lib/prisma";
import type { TUserId } from "../auth/auth.types";
import type { TQuestUpdateData } from "./quest.schema";
import type {
  IQuestCredentials,
  IQuestData,
  IQuestUpdate,
} from "./quest.types";

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
      }
    });
  },

  async update(payload: IQuestUpdate & TQuestUpdateData) {
    return prisma.quest.update({
      where: {
        id: payload.questId,
        userId: payload.userId,
      },
      data: {
        title: payload.title,
        description: payload.description,
        updatedAt: payload.updatedAt,
      },
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

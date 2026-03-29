import { prisma } from "@/shared/lib/prisma";
import type { TUserId } from "../auth/auth.types";
import type { TEdge } from "./edge.schema";
import type { IEdgeUpdateData, TEdgeId } from "./edge.types";

export const EdgeStorage = {
  async getById({
    edgeId,
    userId,
  }: TEdgeId & {
    userId: TUserId;
  }) {
    return prisma.edge.findFirst({
      where: {
        id: edgeId,
        quest: {
          userId,
        },
      },
    });
  },

  async create(data: TEdge) {
    return prisma.edge.create({
      data,
    });
  },

  async update({ data, questId, edgeId, userId }: IEdgeUpdateData) {
    return prisma.edge.updateMany({
      data,
      where: {
        questId,
        id: edgeId,
        quest: {
          userId,
        },
      },
    });
  },
};

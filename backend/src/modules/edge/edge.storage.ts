import { prisma } from "@/shared/lib/prisma";
import type { TEdge } from "./edge.schema";
import type { IEdgeIds, IEdgeUpdateData } from "./edge.types";

export const EdgeStorage = {
  async getById({ edgeId, userId }: IEdgeIds) {
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

  async update({ data, questId, edgeId, userId, updatedAt }: IEdgeUpdateData) {
    return prisma.edge.updateMany({
      data: {
        ...data,
        updatedAt,
      },
      where: {
        questId,
        id: edgeId,
        quest: {
          userId,
        },
      },
    });
  },

  async delete({ edgeId, userId }: IEdgeIds) {
    return prisma.edge.deleteMany({
      where: {
        id: edgeId,
        quest: {
          userId,
        },
      },
    });
  },
};

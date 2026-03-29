import { prisma } from "@/shared/lib/prisma";
import type { TNode } from "./node.schema";
import type { INodePayload, INodeUpdateData } from "./node.types";

export const NodeStorage = {
  async getById({ nodeId, userId }: INodePayload) {
    return prisma.node.findFirst({
      where: {
        id: nodeId,
        quest: {
          userId,
        },
      },
    });
  },

  async create(data: TNode) {
    return prisma.node.create({
      data,
    });
  },

  async update({ data, nodeId, userId }: INodeUpdateData) {
    return prisma.node.updateMany({
      data,
      where: {
        id: nodeId,
        quest: {
          userId,
        },
      },
    });
  },

  async delete({ nodeId, userId }: INodePayload) {
    return prisma.node.deleteMany({
      where: {
        id: nodeId,
        quest: {
          userId,
        },
      },
    });
  },
};

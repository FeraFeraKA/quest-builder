import { prisma } from "@/shared/lib/prisma";
import type { TNode } from "./node.schema";
import type { INodeDeletePayload } from "./node.types";

export const NodeStorage = {
  async create(data: TNode) {
    return prisma.node.create({
      data,
    });
  },

  async delete({ nodeId, userId }: INodeDeletePayload) {
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

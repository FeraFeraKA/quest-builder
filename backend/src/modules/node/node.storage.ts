import { prisma } from "./../../shared/lib/prisma.js";
import type { TQuestId } from "../quest/quest.types.js";
import type { TNode } from "./node.schema.js";
import type { INodePayload, INodeUpdateData } from "./node.types.js";

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

  async getByQuestId({ questId, nodeId, userId }: INodePayload & TQuestId) {
    return prisma.node.findFirst({
      where: {
        id: nodeId,
        questId,
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

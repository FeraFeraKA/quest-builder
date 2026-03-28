import { prisma } from "@/shared/lib/prisma";
import type { TNode } from "./node.schema";

export const NodeStorage = {
  async create(data: TNode) {
    return prisma.node.create({
      data,
    });
  },
};

import { prisma } from "@/shared/lib/prisma";
import type { TEdge } from "./edge.schema";

export const EdgeStorage = {
  async create(data: TEdge) {
    return prisma.edge.create({
      data,
    });
  },
};

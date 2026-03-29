import z from "zod";
import type { TQuestId } from "../quest/quest.types";

export const EdgeSchema = z
  .object({
    nodeFromId: z.string().min(1, "Id from node is required"),
    nodeToId: z.string().min(1, "Id to node is required"),
  })
  .refine((data) => data.nodeFromId !== data.nodeToId, {
    message: "Edge cannot connect node to itself",
    path: ["nodeToId"],
  });

export type TEdge = z.infer<typeof EdgeSchema> & TQuestId;
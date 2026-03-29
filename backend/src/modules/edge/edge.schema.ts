import z from "zod";
import type { TQuestId } from "../quest/quest.types";

export const EdgeSchema = z.object({
  nodeFromId: z.string().min(1, "Id from node is required"),
  nodeToId: z.string().min(1, "Id to node is required"),
});

export type TEdge = z.infer<typeof EdgeSchema> & TQuestId;

export const PartialEdgeSchema = EdgeSchema.partial();

export type TPartialEdge = z.infer<typeof PartialEdgeSchema>;

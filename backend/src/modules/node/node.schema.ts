import z from "zod";
import type { TQuestId } from "../quest/quest.types.js";

export const NodeSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be shorter than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(2000, "Description must be shorter than 2000 characters"),
  positionX: z.number(),
  positionY: z.number(),
});

export type TNode = z.infer<typeof NodeSchema> & TQuestId;

export const PartialNodeSchema = NodeSchema.partial();

export type TPartialNode = z.infer<typeof PartialNodeSchema>;

export const NodeIdSchema = z.string();

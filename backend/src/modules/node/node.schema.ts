import z from "zod";

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

export type TNode = z.infer<typeof NodeSchema> & {
  questId: string;
};

export const PartialNodeSchema = NodeSchema.partial();

export type TPartialNode = z.infer<typeof PartialNodeSchema>;

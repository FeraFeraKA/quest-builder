import z from "zod";

export const QuestDataSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be shorter than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(2000, "Description must be shorter than 100 characters"),
});

export const PartialQuestDataSchema = QuestDataSchema.partial();

export type TPartialQuestData = z.infer<typeof PartialQuestDataSchema>;

export const QuestIdSchema = z.string();

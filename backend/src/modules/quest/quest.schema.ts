import z from "zod";

export const QuestDataSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be shorter than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(2000, "Description must be shorter than 2000 characters"),
});

export const QuestUpdateDataSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export type TQuestUpdateData = z.infer<typeof QuestUpdateDataSchema>;

export const QuestIdSchema = z.string();

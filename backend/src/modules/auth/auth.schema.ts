import z from "zod";

const RegisterLoginSchema = z.object({
  nickname: z
    .string()
    .min(1, "Nickname is required")
    .max(100, "Nickname must be shorter that 100 characters")
    .trim(),
  password: z.string().min(8, "Password too short").trim(),
});

export default RegisterLoginSchema;

export type RegisterLoginType = z.infer<typeof RegisterLoginSchema>;

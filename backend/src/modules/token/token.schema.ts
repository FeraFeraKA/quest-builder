import z from "zod";

export const RefreshTokenSchema = z.jwt();

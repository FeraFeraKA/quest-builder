import type { User } from "generated/prisma/client";

export function toSafeUser(user: User) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

import type { User } from "./../../../generated/prisma/client.js";

export function toSafeUser(user: User) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

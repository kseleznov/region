import type { PrismaClient } from '@prisma/client';

/**
 * Derives a unique, URL-safe username from an email's local part, appending
 * an incrementing number on collision. Used both by real signup
 * (`AuthService.register`) and the one-off backfill script for pre-existing
 * accounts, so both paths produce usernames the same way.
 */
export async function generateUniqueUsername(
  prisma: PrismaClient,
  email: string,
): Promise<string> {
  const base =
    email
      .split('@')[0]
      .toLowerCase()
      .replace(/[^a-z0-9_.]/g, '') || 'user';

  let candidate = base;
  let suffix = 1;

  while (await prisma.user.findUnique({ where: { username: candidate } })) {
    suffix += 1;
    candidate = `${base}${suffix}`;
  }

  return candidate;
}

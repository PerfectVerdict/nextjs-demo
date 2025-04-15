// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // Allow global Prisma reuse in dev (avoids too many connections)
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ??
  new PrismaClient({
    // Explicitly set your datasource URL if needed
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    __internal: {
      engine: {
        env: {
          PRISMA_DISABLE_STATEMENT_CACHE: "true",
        },
      },
    },
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export { prisma };

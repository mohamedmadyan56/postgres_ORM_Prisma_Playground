import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ─── Raw SQL Query (SELECT) ──────────────────────────────────
  const users = await prisma.$queryRaw`SELECT id, name, email FROM "User"`;
  console.log("Raw SELECT:", users);

  // ─── Raw SQL with parameters ─────────────────────────────────
  const user = await prisma.$queryRaw`
    SELECT * FROM "User" WHERE       email = ${"example-ahmed@example.com"}
  `;
  console.log("Raw parameterized:", user);

  // ─── Raw SQL Execute (INSERT/UPDATE/DELETE) ─────────────────
  const result = await prisma.$executeRaw`
    UPDATE "User" SET name = ${"Raw Updated"} WHERE       email = ${"example-ahmed@example.com"}
  `;
  console.log("Rows affected:", result);
}

main()
  .catch((e) => console.error(e.message))
  .finally(() => prisma.$disconnect());

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ─── Find Many ────────────────────────────────────────────────
  const allUsers = await prisma.user.findMany();
  console.log("All users:", allUsers);

  // ─── Find Unique by ID ────────────────────────────────────────
  const firstUser = await prisma.user.findFirst();
  if (firstUser) {
    const user = await prisma.user.findUnique({
      where: { id: firstUser.id },
    });
    console.log("User by ID:", user);
  }

  // ─── Find with Filtering ──────────────────────────────────────
  const admins = await prisma.user.findMany({
    where: { role: "ADMIN" },
  });
  console.log("Admins:", admins);

  // ─── Find with Select (specific fields) ───────────────────────
  const namesOnly = await prisma.user.findMany({
    select: { name: true, email: true },
  });
  console.log("Names only:", namesOnly);

  // ─── Find with Pagination ─────────────────────────────────────
  const page = await prisma.user.findMany({
    skip: 0,
    take: 5,
    orderBy: { name: "asc" },
  });
  console.log("Paginated users:", page);
}

main()
  .catch((e) => console.error(e.message))
  .finally(() => prisma.$disconnect());

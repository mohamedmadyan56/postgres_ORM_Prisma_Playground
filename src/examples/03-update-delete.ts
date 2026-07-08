import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ─── Update User ──────────────────────────────────────────────
  const updated = await prisma.user.update({
          where: { email: "example-ahmed@example.com" },
    data: { name: "Ahmed Mohamed" },
  });
  console.log("Updated user:", updated);

  // ─── Upsert (Create or Update) ────────────────────────────────
  const upserted = await prisma.user.upsert({
      where: { email: "example-sara@example.com" },
    update: { name: "Sara Updated" },
    create: {
      name: "Sara",
      email: "example-sara@example.com",
      phone: "01112345678",
    },
  });
  console.log("Upserted user:", upserted);

  // ─── Delete ───────────────────────────────────────────────────
  const deleted = await prisma.user.delete({
      where: { email: "example-sara@example.com" },
  });
  console.log("Deleted user:", deleted);

  // ─── Delete Many ──────────────────────────────────────────────
  const count = await prisma.user.deleteMany({
    where: { role: "USER" },
  });
  console.log(`Deleted ${count.count} users`);
}

main()
  .catch((e) => console.error(e.message))
  .finally(() => prisma.$disconnect());

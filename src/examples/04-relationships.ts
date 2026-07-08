import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ─── Create user with nested writes ───────────────────────────
  const user = await prisma.user.create({
    data: {
      name: "Mona Khaled",
      email: "example-mona@example.com",
      phone: "01298765432",
      role: UserRole.ADMIN,
      profile: {
        create: { bio: "Admin user", emailUpdates: true },
      },
      categories: {
        create: [{ name: "Lifestyle" }, { name: "Travel" }],
      },
    },
    include: { profile: true, categories: true },
  });
  console.log("User with relations:", JSON.stringify(user, null, 2));

  // ─── Read User with Profile (One-to-One) ─────────────────────
  const withProfile = await prisma.user.findUnique({
    where: { id: user.id },
    include: { profile: true },
  });
  console.log("User + Profile:", withProfile);

  // ─── Read User with Posts (One-to-Many) ──────────────────────
  const withPosts = await prisma.user.findUnique({
    where: { id: user.id },
    include: { WrittenPosts: true },
  });
  console.log("User + Posts:", withPosts);

  // ─── Read Post with Author & Category ────────────────────────
  const post = await prisma.post.findFirst({
    include: {
      author: true,
      category: true,
    },
  });
  console.log("Post + Author + Category:", post);

  // ─── Nested filtering (filter posts within user query) ────────
  const userWithFilteredPosts = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      WrittenPosts: {
        where: { rating: { gte: 4.0 } },
        orderBy: { createdAt: "desc" },
      },
    },
  });
  console.log("User with filtered posts:", userWithFilteredPosts);
}

main()
  .catch((e) => console.error(e.message))
  .finally(() => prisma.$disconnect());

import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ─── Create User ─────────────────────────────────────────────
  const user = await prisma.user.create({
    data: {
      name: "Ahmed Ali",
      email: "example-ahmed@example.com",
      phone: "01012345678",
      role: UserRole.USER,
    },
  });
  console.log("Created user:", user);

  // ─── Create Profile (One-to-One) ──────────────────────────────
  const profile = await prisma.profile.create({
    data: {
      bio: "Fashion enthusiast",
      emailUpdates: true,
      userId: user.id,
    },
  });
  console.log("Created profile:", profile);

  // ─── Create Category ──────────────────────────────────────────
  const category = await prisma.category.create({
    data: {
      name: "Technology",
      userId: user.id,
    },
  });
  console.log("Created category:", category);

  // ─── Create Post (Many-to-One with User & Category) ───────────
  const post = await prisma.post.create({
    data: {
      title: "My First Post",
      rating: 4.5,
      authorId: user.id,
      categoryId: category.id,
    },
  });
  console.log("Created post:", post);
}

main()
  .catch((e) => console.error(e.message))
  .finally(() => prisma.$disconnect());

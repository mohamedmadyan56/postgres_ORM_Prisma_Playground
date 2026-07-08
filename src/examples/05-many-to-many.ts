// ─── Many-to-Many: Favorite Posts ───────────────────────────────
// A User can favorite many Posts, and a Post can be favorited by many Users.
// This uses an implicit many-to-many relation via the "FavoritePosts" field.

import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      name: "Hoda",
      email: "example-hoda@example.com",
      phone: "01000000001",
      role: UserRole.USER,
    },
  });
  const user2 = await prisma.user.create({
    data: {
      name: "Mai",
      email: "example-mai@example.com",
      phone: "01000000002",
      role: UserRole.USER,
    },
  });

  // Create posts
  const cat = await prisma.category.create({ data: { name: "General" } });

  const post1 = await prisma.post.create({
    data: { title: "Post 1", rating: 4.0, authorId: user1.id, categoryId: cat.id },
  });
  const post2 = await prisma.post.create({
    data: { title: "Post 2", rating: 4.5, authorId: user2.id, categoryId: cat.id },
  });

  // ─── Connect: User1 favorites both posts ──────────────────────
  await prisma.user.update({
    where: { id: user1.id },
    data: {
      favoritePosts: {
        connect: [{ id: post1.id }, { id: post2.id }],
      },
    },
  });

  // ─── User2 favorites Post1 only ───────────────────────────────
  await prisma.user.update({
    where: { id: user2.id },
    data: {
      favoritePosts: {
        connect: [{ id: post1.id }],
      },
    },
  });

  // ─── Read User with their favorite posts ──────────────────────
  const userWithFavs = await prisma.user.findUnique({
    where: { id: user1.id },
    include: { favoritePosts: true },
  });
  console.log("User 1 favorites:", JSON.stringify(userWithFavs, null, 2));

  // ─── Disconnect (remove favorite) ─────────────────────────────
  await prisma.user.update({
    where: { id: user1.id },
    data: {
      favoritePosts: {
        disconnect: [{ id: post2.id }],
      },
    },
  });

  console.log("Removed Post2 from favorites");
}

main()
  .catch((e) => console.error(e.message))
  .finally(() => prisma.$disconnect());

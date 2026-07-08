import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.post.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      phone: "01000000000",
      role: UserRole.ADMIN,
      profile: {
        create: { bio: "Platform admin", emailUpdates: false },
      },
    },
  });

  const ahmed = await prisma.user.create({
    data: {
      name: "Ahmed Ali",
      email: "ahmed@example.com",
      phone: "01011111111",
      role: UserRole.USER,
      profile: {
        create: { bio: "Software engineer", emailUpdates: true },
      },
    },
  });

  const sara = await prisma.user.create({
    data: {
      name: "Sara Khaled",
      email: "sara@example.com",
      phone: "01022222222",
      role: UserRole.USER,
      profile: {
        create: { bio: "Designer", emailUpdates: true },
      },
    },
  });

  // Create categories
  const tech = await prisma.category.create({
    data: { name: "Technology", userId: admin.id },
  });
  const lifestyle = await prisma.category.create({
    data: { name: "Lifestyle", userId: admin.id },
  });
  const travel = await prisma.category.create({
    data: { name: "Travel", userId: ahmed.id },
  });

  // Create posts
  const post1 = await prisma.post.create({
    data: {
      title: "Getting Started with Prisma",
      rating: 4.8,
      authorId: ahmed.id,
      categoryId: tech.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: "TypeScript Best Practices",
      rating: 4.5,
      authorId: ahmed.id,
      categoryId: tech.id,
    },
  });

  const post3 = await prisma.post.create({
    data: {
      title: "10 Tips for Healthy Living",
      rating: 4.2,
      authorId: sara.id,
      categoryId: lifestyle.id,
    },
  });

  const post4 = await prisma.post.create({
    data: {
      title: "Exploring Cairo",
      rating: 4.9,
      authorId: sara.id,
      categoryId: travel.id,
    },
  });

  // Favorite posts (many-to-many)
  await prisma.user.update({
    where: { id: ahmed.id },
    data: { favoritePosts: { connect: [{ id: post3.id }, { id: post4.id }] } },
  });

  await prisma.user.update({
    where: { id: sara.id },
    data: { favoritePosts: { connect: [{ id: post1.id }, { id: post2.id }] } },
  });

  console.log("Seed complete!");
  console.log({ users: 3, categories: 3, posts: 4 });
}

main()
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

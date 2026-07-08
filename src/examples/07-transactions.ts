import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ─── Interactive Transaction ──────────────────────────────────
  // All operations succeed or all roll back.
  const [user, post] = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name: "Transaction User",
        email: "example-tx@example.com",
        phone: "01099999999",
        role: UserRole.USER,
      },
    });

    const cat = await tx.category.create({
      data: { name: "TX Category" },
    });

    const post = await tx.post.create({
      data: {
        title: "Transactional Post",
        rating: 5.0,
        authorId: user.id,
        categoryId: cat.id,
      },
    });

    return [user, post];
  });

  console.log("Transaction succeeded:", { user, post });
}

main()
  .catch((e) => console.error(e.message))
  .finally(() => prisma.$disconnect());

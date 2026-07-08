import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ─── Aggregate ────────────────────────────────────────────────
  const stats = await prisma.post.aggregate({
    _avg: { rating: true },
    _max: { rating: true },
    _min: { rating: true },
    _count: { id: true },
  });
  console.log("Post stats:", stats);

  // ─── Count with where ─────────────────────────────────────────
  const highRated = await prisma.post.count({
    where: { rating: { gte: 4.0 } },
  });
  console.log("High-rated posts:", highRated);

  // ─── Group By ─────────────────────────────────────────────────
  const grouped = await prisma.post.groupBy({
    by: ["authorId"],
    _avg: { rating: true },
    _count: { id: true },
  });
  console.log("Posts grouped by author:", grouped);
}

main()
  .catch((e) => console.error(e.message))
  .finally(() => prisma.$disconnect());

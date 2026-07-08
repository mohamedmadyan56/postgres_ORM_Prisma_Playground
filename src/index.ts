import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findMany({
    take: 2,
    skip: 1,
  });

  console.log(user);
}

main()
  .catch((error) => console.error(error.message))
  .finally(async () => {
    await prisma.$disconnect();
  });

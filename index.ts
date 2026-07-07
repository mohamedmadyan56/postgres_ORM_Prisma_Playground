import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.create({ data: { name: "mohamed madyan" } });
    console.log(users);
}

main().catch(error => {
    console.error(error.message)
}).finally(async () => {
    prisma.$disconnect();
})
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){
  const users = await prisma.user.findMany();
  console.log(users);
}

main().catch(error=>{
    console.error(error.message)
}).finally(async()=>{
    prisma.$disconnect();
})
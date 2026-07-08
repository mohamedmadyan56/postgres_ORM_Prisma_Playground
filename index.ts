import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({data:{
        name:'madyan',
        email:"madyan@gmail.com",
        phone:"026648854",
       
    }})
    console.log(user);
}

main().catch(error => {
    console.error(error.message)
}).finally(async () => {
    prisma.$disconnect();
})
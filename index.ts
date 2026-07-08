import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
    data:{
        name:'ahmed',
        email:'medo@gmail.com',
        phone:'468476854',
        profile:{
            create:{
                emailUpdates:true,
            }
        }
    },
    include:{
        profile:true
    }
    })
       
    
    console.log(user);
}

main().catch(error => {
    console.error(error.message)
}).finally(async () => {
    prisma.$disconnect();
})
// import {PrismaClient} from "@prisma/client";
// import {links} from "@/data/links";
//
// const prisma = new PrismaClient();
// async function main(){
//     await prisma.user.create({
//         data: {
//             email: 'mukulphoughat@gmail.com',
//             role: 'ADMIN'
//         },
//     });
//     await prisma.link.createMany({
//         data: links
//     });
// }
// main().catch((e:Error)=>{
//     console.log(e)
// }).finally(async ()=>{
//     await prisma.$disconnect();
//     console.log("ADDED TO DB")
// })
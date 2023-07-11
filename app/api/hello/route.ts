import {NextRequest} from "next/server";
import {PrismaClient} from "@prisma/client";
import {links} from "@/data/links";
const prismaClient=new PrismaClient()
export async function GET(req: Request){
    try {
        // await prismaClient.link.createMany({
        //     data: links
        // });
        return new Response(JSON.stringify({hello: "Hello World!"}))
    } catch (e) {
        throw e
    }
    // return new Response(JSON.stringify({hello: "Hello World!"}))
}
export async function POST(req: NextRequest){
    // await prismaClient.user.create({
    //     data: {
    //         email: 'mukulphoughat@gmail.com',
    //         role: 'ADMIN'
    //     }
    // })
    console.log(req.cookies.get('myCookie')?.value)
    console.log(req.body)
    return new Response("POSTED!")
}
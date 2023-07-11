import {PrismaClient} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";

const prismaClient=new PrismaClient()
export async function POST(req: NextRequest){
    const body=await req.json()
    const {name, email, password}=body
    if ( !name || !email || !password) {
        return NextResponse.json({message: "Missing Fields", status: 422})
    }
    const exists= await prismaClient.user.findUnique({
        where: {
            email: email
        }
    })
    if ( exists ) {
        return NextResponse.json({message: "User Exists With this Email", status: 404});
    }
    console.log(body)
    const user=await prismaClient.user.create({
        data: {
            name: name,
            email: email,
            password: password
        }
    });
    return NextResponse.json({user, status: 200})
}
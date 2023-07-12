import {NextRequest, NextResponse} from "next/server";
import client from "@/utils/prismadb";
import {PrismaClient} from "@prisma/client";
const prismaClient=new PrismaClient();
export async function GET(){
    const response=await prismaClient.link.findMany()
    return new Response(JSON.stringify(response))
}
export async function POST(req: NextRequest){
    const body=await req.json()
    const prismaClient=new PrismaClient();
    if ( body !== null ){
        await prismaClient.link.create({
            data: body
        })
        // res.status(200).body(JSON.stringify({message: "Data Posted Successful."}))
        return NextResponse.json({message: "Data Posted Successful",status: 200})
        // return new Response(JSON.stringify({message: "Data Posted"}));
    }

    console.log(body)
    return NextResponse.json({message: "Failed To Post Data",status: 422})
}
export async function DELETE(req: NextRequest){
    const body=await req.json();
    console.log(body)
    if ( body !== null ) {
        console.log(body.id)
        // const response=await prismaClient.link.findUnique({where: {id: 5}})
        const delResponse=await prismaClient.link.delete({where: {id: body.id}, select: {title: true}})
        const messagePro=delResponse.title+ " Link Deleted";
        return NextResponse.json({message: messagePro, status: 200});
    }
}
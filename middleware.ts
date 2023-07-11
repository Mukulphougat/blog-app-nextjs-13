import {NextRequest, NextResponse} from "next/server";

export default function Middleware(req: NextRequest){
    // if (req.nextUrl.pathname !== "/login")   return NextResponse.redirect(new URL("/login",req.url))
}
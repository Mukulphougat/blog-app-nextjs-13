"use client"
import {useSession} from "next-auth/react";

export default function SessionClient(){
    const {data: session}=useSession();
    return (
        <div className={"text-blue-500 text-2xl"}>
            {JSON.stringify(session)}
        </div>
    )
}
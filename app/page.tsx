'use client'
import GetSession from "@/utils/GetSession";
import React from "react";
import ListOfLinks from "@/components/ListOfLinks";
import {useSession} from "next-auth/react";
import Login from "@/app/login/page";
import {useRouter} from "next/navigation";

export default function Home() {
    // const sessionData=await GetSession();
    // console.log(sessionData)
    const router=useRouter()
    const session=useSession()
  return (
    <main className="bg-white max-h-screen p-12 mx-auto grid place-items-center w-full">
        {
            session?.status === "authenticated" ?
                <ListOfLinks />
                :
                <div className={"mx-auto my-auto w-1/2 h-50 flex flex-col justify-center"}>
                    <h1 className={"mx-auto text-blue-500 text-4xl font-mono"}>404 Please Login!</h1>
                    <button onClick={()=>router.push("/login")} className={"w-1/3 mx-auto rounded-sm font-mono text-xl my-10 h-10 bg-blue-500 text-white"}>Continue</button>
                </div>
        }
    </main>
  )
}

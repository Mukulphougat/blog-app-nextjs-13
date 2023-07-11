"use client"
import Link from "next/link";
import {B612, Lato, Montserrat} from "next/font/google";
import {signOut, useSession} from "next-auth/react";
const montserrat=Lato({weight: "700", subsets: ['latin']})
export default function Header(){
    const session=useSession()
    return (
        <div className={"w-full h-12 bg-white justify-between text-blue-500 flex flex-row"}>
            {
                session?.status == "authenticated" &&
                <>
                    <Link className={"mx-2 my-3 text-xl"} href={"/"}>
                        <h1 className={montserrat.className}>Home</h1>
                    </Link>
                    <div className={"w-44 flex flex-row"}>
                        <Link className={"mx-2 my-3 text-xl"} href={"/upload"}>
                            <h1 className={montserrat.className}>Upload</h1>
                        </Link>
                        <button className={"mx-2 my-3 text-xl"} onClick={()=>signOut()}>
                            <h1 className={montserrat.className}>Logout</h1>
                        </button>
                    </div>
                </>
            }
        </div>
    )
}
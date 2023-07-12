"use client"
import {AwesomeLink} from "@/components/AwesomeLinks";
import React from "react";
import useSWR from "swr";
const fetcher= async (url:string) => {
    const response=await fetch(url, {method: "GET"});
    return response.json()
}
export default function ListOfLinks(){
    const {data}=useSWR("/api/linksAll", fetcher)

    return (
        <div className={"w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"}>
            {
                data !== null && data !== undefined && data.map((link)=>{
                    return(
                        <AwesomeLink imageUrl={link.imageURL} url={link.url} title={link.title} category={link.category} description={link.description} id={link.id} key={link.id}/>
                    )
                })
            }
        </div>
    )
}
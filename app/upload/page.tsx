"use client"
// import {AwesomeLink} from "@/components/AwesomeLinks";
// import {revalidatePath} from "next/cache";
import {useRouter} from "next/navigation";
import {ServerActionToUpload, ServerActionToDelete} from "@/components/ServerActionToUpload";
import {z, ZodType} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useState} from "react";
import {useSession} from "next-auth/react";
type formData = {
    category: string
    title: string
    url: string
    imageURL: string
    id: number
    description: string
}
export default function Upload(){
    const session=useSession()
    const [show,setShow]=useState(false);
    const router=useRouter();
    const formSchema = z
        .object({
            category: z.string().min(4, "Category is required").max(100),
            title: z.string().min(1, "Title is required"),
            url: z.string().url("Invalid URL").min(5,"URL is required"),
            imageURL: z.string().url("Invalid URL").min(5,"URL is required"),
            id: z.number().min(1).max(2),
            description: z.string().min(1,"Description is required")
        })
    const {register,watch,handleSubmit,formState: {errors,isSubmitting}}=useForm<formData>({resolver: zodResolver(formSchema)})
    const myFormData=watch();
    const submitData=(data: formData)=>{
        console.log("HANDLING SUBMIT", data)
    }
    async function postData(formData: FormData)  {
        const category=formData.get("category") as string;
        const title=formData.get("title") as string;
        const id=formData.get("id") as string;
        const description=formData.get("description") as string;
        const imageURL=formData.get("imageURL") as string;
        const url=formData.get("url") as string;
        // todos.push(category)
        // console.log(todos[0])
        const response=await ServerActionToUpload(category,imageURL,parseInt(id),url,title,description);
        router.push("/")
        // revalidatePath("/upload")
    }
    // async function addItem(data: FormData) {
    //     'use server'
    //     console.log("RECEIVED")
    // }
    // async function doSomething(){
    //     "use server"
    //     console.log("asfasf")
    // }
    return (
        <main className="bg-white h-full mx-auto grid place-items-center w-full">
            {
                session?.status === "authenticated" ?
                    <div className={"my-10 w-full grid place-items-center text-gray-400"}>
                        <div className="w-full max-w-xs">
                            <form onSubmit={handleSubmit(submitData)} action={postData} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                        Category
                                    </label>
                                    <input
                                        required={true} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id={"category"} type="text" placeholder="Category" {...register("category")}/>
                                    {errors.category && <span className={"text-lg text-red-800 font-mono"}>{errors.category.message}</span>}

                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                        Description
                                    </label>
                                    <input required={true}
                                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                           id={"description"} type="text" placeholder="Description" {...register("description")}/>
                                    {errors.description && <span className={"text-lg text-red-800 font-mono"}>{errors.description.message}</span>}

                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                        ID
                                    </label>
                                    <input required={true}
                                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                           id={"id"} type="number" placeholder="ID" {...register("id", {valueAsNumber: true})}/>
                                    {errors.id && <span className={"text-lg text-red-800 font-mono"}>{errors.id.message}</span>}

                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                        ImageURL
                                    </label>
                                    <input required={true}
                                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                           id={"imageURL"} type="text" placeholder="Description" {...register("imageURL")}/>
                                    {errors.imageURL && <span className={"text-lg text-red-800 font-mono"}>{errors.imageURL.message}</span>}

                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                        Title
                                    </label>
                                    <input required={true}
                                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                           id={"title"} type="text" placeholder={"Title"} {...register("title")}/>
                                    {errors.title && <span className={"text-lg text-red-800 font-mono"}>{errors.title.message}</span>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                        URL
                                    </label>
                                    <input required={true}
                                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                           id={"url"} type="text" placeholder="URL" {...register("url")}/>
                                    {errors.url && <span className={"text-lg text-red-800 font-mono"}>{errors.url.message}</span>}
                                </div>
                                <div className="flex items-center justify-around">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="submit">
                                        Submit
                                    </button>
                                    {/*<a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"*/}
                                    {/*   href="#">*/}
                                    {/*    Forgot Password?*/}
                                    {/*</a>*/}
                                </div>
                            </form>
                            {/*<p className="text-center text-gray-500 text-xs">*/}
                            {/*    /!*&copy;2023 Acme Corp. All rights reserved.*!/*/}
                            {/*    {names.length >= 1 ? names[1] : "NONE"}*/}
                            {/*</p>*/}
                            {/*<div className={"text-gray-400"}>*/}
                            {/*    <button onClick={()=>ServerActionToDelete(35)}>Delete</button>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    :
                    <div className={"mx-auto my-auto w-1/2 h-50 flex flex-col justify-center"}>
                        <h1 className={"mx-auto text-blue-500 text-4xl font-mono"}>404 Please Login!</h1>
                        <button onClick={()=>router.push("/login")} className={"w-1/3 mx-auto rounded-sm font-mono text-xl my-10 h-10 bg-blue-500 text-white"}>Continue</button>
                    </div>
            }
        </main>
    )
}
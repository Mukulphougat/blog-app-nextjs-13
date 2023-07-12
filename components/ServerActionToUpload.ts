"use server"

export async function ServerActionToUpload(category: string, imageURL: string, id: number, url: string, title: string, description: string){
    const response=await fetch("https://blog-app-nextjs-13-6hmxz4jnk-mukulphougat.vercel.app/api/linksAll",
        {method: "POST", body: JSON.stringify({category: category,imageURL: imageURL,url: url,title: title,id: id,description: description})});
    console.log(await response.json())
    // return await response.json();
}
export async function ServerActionToDelete(id: number){
    const response=await fetch("http://localhost:3000/api/linksAll", {
        method: "DELETE",
        body: JSON.stringify({id: id})
    })
    console.log(await response.json())
}
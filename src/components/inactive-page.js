"use client"
import { useRouter } from "next/navigation"


export default function InactivePage()
{
    const router = useRouter()

    return(
        <div className="h-screen -screen flex flex-col gap-4 justify-center items-center text-center">
            <h1 className="text-xl font-bold">The Form is Inactive</h1>
            <p>Sorry for the trouble, the owner made this form inactive.</p>
            <button onClick={()=>router.back()} className="py-2 px-4 rounded-md border-2 bg-emerald-600 text-white font-semibold">Back to the page</button>
        </div>
    )
}
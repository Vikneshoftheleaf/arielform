"use client"
import { signIn } from "next-auth/react"
export default function GoogleSigninBtn()
{
    return(
        <button onClick={() => signIn("google")} className="w-full text-slate-950 bg-emerald-50 border-2 border-emerald-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Continue With Google</button>
    )
}
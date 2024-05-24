"use client"
import { useRouter } from "next/navigation";
import GoogleSigninBtn from "./google-signup-btn";

import Link from "next/link";
export default function Navbar() {
    const router = useRouter();
    if (router.pathname != "dashboard")
        return (

            <nav className="w-full flex justify-between gap-4 py-4 px-8 items-center">
                <div>
                    <Link href={'/'}>Logo</Link>
                </div>
                <div>

                </div>
                <div className="flex justify-end gap-4 items-center">
                    <Link href={'dashboard'}>Dashboard</Link>
                    <Link href={'login'}>Login</Link>
                    <Link className="bg-emerald-600 text-slate-50 px-4 py-2 rounded-full" href={'signup'}>Signup</Link>
                    <GoogleSigninBtn></GoogleSigninBtn>
                </div>
            </nav>

        )
}
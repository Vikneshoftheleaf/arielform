"use client"
import { useRouter } from "next/navigation";
import GoogleSigninBtn from "./google-signup-btn";

import Link from "next/link";
import { signIn } from "next-auth/react";
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
                    <Link href={'signup'}>Signup</Link>
                </div>
            </nav>

        )
}
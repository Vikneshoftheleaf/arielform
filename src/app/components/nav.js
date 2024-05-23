"use client"
import { useRouter } from "next/navigation";

import Link from "next/link";
export default function Navbar() {
    const router = useRouter();
    if(router.pathname != "dashboard")
    return (

            <nav className="w-full flex justify-end gap-4 p-4">
                <Link href={'login'}>Login</Link>
                <Link href={'signup'}>Signup</Link>
                <Link href={'dashboard'}>Dashboard</Link>

            </nav>
       
    )
}
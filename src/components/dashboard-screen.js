"use client"
import { useAuthContext } from '@/context/auth-context'
import PopupModal from '@/components/popup-modal';
import EndpointList from './endpoint-lists';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Spinner from './spinner';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Switch } from '@radix-ui/react-switch';
import { LogOut, LogOutIcon, LucideLogOut, Menu, MenuSquare, User, X } from 'lucide-react';
export default function DashboardScreen() {
    const router = useRouter();
    const { user } = useAuthContext();
    const [offcanvasVisibility, setoffcanvasVisibility] = useState("-translate-x-full")
    const [loading, setloading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push('login')
        }
        else {
            setloading(false)
        }

    }, [user])

    if (loading) {
        <div className='h-full w-full flex justify-center items-center'>
            <Spinner></Spinner>
        </div>
    }

    else
        return (
            <main >

                <nav class="fixed flex p-4 justify-between items-center top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <div className='flex gap-4'>
                            {
                                (offcanvasVisibility === "-translate-x-full")?<Menu onClick={()=>setoffcanvasVisibility("translate-x-0")} className='sm:block lg:hidden'/>:<X onClick={()=>setoffcanvasVisibility("-translate-x-full")} className='sm:block lg:hidden'/>
                            }
                        
                        <h1>Logo</h1>
                    </div>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar className="border-2 ">
                                    <AvatarImage src={user.photoURL} className="rounded-[100%]" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>

                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white p-4">
                                <DropdownMenuLabel>
                                    <h1 className='flex gap-2'><span><User /></span>{(user == null) ? null : user.email}</h1>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className='flex gap-2'><span><LogOut /></span><button onClick={() => signOut(auth)} >Signout</button></DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>


                    </div>

                </nav>

                <aside id="logo-sidebar" class={`fixed ease-in duration-300 top-0 left-0 z-40 w-64 h-screen pt-20 ${offcanvasVisibility} sm:-translate-x-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`} aria-label="Sidebar">
                    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                        <ul class="space-y-2 font-bold">
                            <li>
                                <a href="#" class=" flex items-center p-2 text-gray-900 rounded-[8px] dark:text-white hover:bg-emerald-100 dark:hover:bg-gray-700 group">
                                    <span class="ms-3">
                                        <PopupModal userinfo={user} />
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="#" class=" flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <span class="ms-3">All</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" class=" flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <span class="ms-3">Submissions</span>
                                </a>
                            </li>


                        </ul>
                    </div>
                </aside>

                <div onClick={()=>setoffcanvasVisibility("-translate-x-full")} class="p-4 sm:ml-64">
                    <EndpointList userID={user.uid}></EndpointList>

                </div>

            </main>
        )
}
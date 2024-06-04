"use client"
import { useAuthContext } from '@/context/auth-context'
import PopupModal from '@/components/popup-modal';
import EndpointList from './endpoint-lists';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import useNavigation from '@/hooks/useNavigation';
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
import { List, ListCollapse, ListFilter, LogOut, LogOutIcon, LucideLogOut, Menu, MenuSquare, Table, User, X } from 'lucide-react';
import Link from 'next/link';
export default function DashboardScreen({children}) {
    const router = useRouter();
    const { user } = useAuthContext();
    const [offcanvasVisibility, setoffcanvasVisibility] = useState("-translate-x-full")
    const [loading, setloading] = useState(true);
    const{
        isEndpoints,isSubmission
    } = useNavigation()

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
                                    <AvatarImage src={(user.photoURL !=null)?user.photoURL:null} className="rounded-[100%]" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>

                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white p-4">
                                <DropdownMenuLabel>
                                    <h1 className='flex gap-2'><span><User /></span>{(user == null) ? null : user.email}</h1>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className='flex gap-2'><span><LogOut /></span><button onClick={() => {setloading(true);signOut(auth)}} >Signout</button></DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>


                    </div>

                </nav>

                <aside id="logo-sidebar" class={`fixed ease-in duration-300 top-0 left-0 z-40 w-64 h-screen pt-20 ${offcanvasVisibility} sm:-translate-x-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`} aria-label="Sidebar">
                    <div class="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800">
                        <ul class="space-y-2 font-bold">
                            <li>
                                <div  class="p-3 flex items-center  text-gray-900 rounded-[8px] dark:text-white hover:bg-emerald-100 dark:hover:bg-gray-700 group">
                                    <span class="ms-3 w-full">
                                        <PopupModal className="w-full" userinfo={user} />
                                    </span>
                                </div>
                            </li>
                            <li>
                                <Link onClick={()=>setoffcanvasVisibility("-translate-x-full")} href={'/dashboard/all'} class=" hover:bg-emerald-100 flex items-center p-3 text-gray-900 rounded-[8px] dark:text-white dark:hover:bg-gray-700 group">
                                    <span class="ms-3 flex gap-2"> <ListFilter size={24} className='bg-emerald-100  text-emerald-600 p-1 rounded-[8px]'/> All</span>
                                </Link>
                            </li>
                            <li>
                                <Link onClick={()=>setoffcanvasVisibility("-translate-x-full")} href={'/dashboard/submissions'} class="hover:bg-emerald-100 flex items-center p-3 text-gray-900 rounded-[8px] dark:text-white dark:hover:bg-gray-700 group">
                                    <span class="ms-3 flex gap-2"> <Table size={24} className='bg-emerald-100 text-emerald-600 p-1 rounded-[8px]'/>  Submissions</span>
                                </Link>
                            </li>


                        </ul>
                    </div>
                </aside>

                <div onClick={()=>setoffcanvasVisibility("-translate-x-full")} class="py-8 px-4 sm:ml-64">
                    {
                        children
                    }

                </div>

            </main>
        )
}
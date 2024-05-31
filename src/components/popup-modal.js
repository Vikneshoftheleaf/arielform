"use client"

import { useState } from "react";

import { auth, db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Delete, Edit, Edit2, Edit3, EditIcon, LucideEdit2, LucideTrash, PlusIcon, ShieldPlus, Trash, Trash2, Trash2Icon } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const PopupModal = ({ userinfo }) => {

    const [modalVisible, setmodalVisible] = useState('hidden');
    const [domainName, setDomainName] = useState('');
    const [endpointName, setendpointName] = useState('');

    async function createEndpoint() {

        await addDoc(collection(db, "endpoints"), {
            uid: userinfo.uid,
            domainName: domainName,
            name: endpointName,
            Responses: 0,
            active:true,
            createdAt: serverTimestamp()

        });

    }
    return (
        <>

            <AlertDialog>
                <AlertDialogTrigger>
                    <button className="flex gap-2 "><PlusIcon className="text-emerald-600" size={24}/> New</button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white rounded-[8px]">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold">Create New Endpoint</AlertDialogTitle>
                        <AlertDialogDescription>
                            <div class="space-y-4 my-2">
                                <div>
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Endpoint Name</label>
                                    <input onChange={(e) => setendpointName(e.currentTarget.value)} type="text" name="name" id="name" class="rounded-[8px] outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Acme Inc" required />
                                </div>
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Domain Name</label>
                                    <input onChange={(e) => setDomainName(e.currentTarget.value)} type="url" name="email" id="email" class="bg-gray-50 border rounded-[8px] outline-none border-gray-300 text-gray-900 text-sm  focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="https://example.com" required />
                                </div>

                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-[8px] outline-none border-0">Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-emerald-600 hover:bg-emerald-200 hover:text-slate-950 text-white rounded-[8px]"><button onClick={() => createEndpoint()}>Create</button></AlertDialogAction>
                    </AlertDialogFooter>

                </AlertDialogContent>
            </AlertDialog>


            {/*<div>

                <button onClick={() => setmodalVisible("flex")} class="w-full block text-white bg-emerald-600 py-2 rounded-md" type="button">
                    New
                </button>

                <div id="authentication-modal" class={`${modalVisible} absolute  top-0 right-0 left-0 z-50 justify-center items-center w-screen md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                    <div class="relative p-4 w-full max-w-md max-h-full">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Project's Domain Name
                                </h3>
                                <button onClick={() => setmodalVisible('hidden')} type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div class="p-4 md:p-5">
                                <div class="space-y-4">
                                    <div>
                                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Endpoint Name</label>
                                        <input onChange={(e) => setendpointName(e.currentTarget.value)} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Acme Inc" required />
                                    </div>
                                    <div>
                                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Domain Name</label>
                                        <input onChange={(e) => setDomainName(e.currentTarget.value)} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="https://example.com" required />
                                    </div>


                                    <button onClick={() => createEndpoint()} class="w-full text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Next</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
*/}
        </>


    )
}

export default PopupModal;

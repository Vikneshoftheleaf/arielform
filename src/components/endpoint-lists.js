"use client"
import { useEffect, useState } from "react";
import { collection, where, onSnapshot, QuerySnapshot, query, orderBy, docs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Switch } from "./ui/switch";
import CopyToClipboard from "./copy-to-clipboard";
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";
import { Delete, Edit, Edit2, Edit3, EditIcon, LucideEdit2, LucideTrash, Trash, Trash2, Trash2Icon } from "lucide-react";
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

export default function EndpointList({ userID }) {
    const {toast} = useToast();
    const [endpoints, setendpoints] = useState([]);
    const [rename, setRename] = useState();


    useEffect(() => {
        const cref = collection(db, 'endpoints')
        const q = query(cref, where("uid", "==", userID), orderBy("createdAt", "desc"));
        const tt = onSnapshot(q, (QuerySnapshot) => {
            setendpoints(QuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))

        })
        return tt

    }, [endpoints.length])

    function handleActive(id, state) {

        updateDoc(doc(db, "endpoints", id), {
            active: !state,
        })
    }

    async function delEndpoint(id) {

        await deleteDoc(doc(db, "endpoints", id)).then(()=>{
            toast({
                title: "Deleted Successfully!",
                description: "Your Endpoint got deleted Successfully!",
              })
        });

    }

    function renameEndpoint(id)
    {
        updateDoc(doc(db,'endpoints',id),{
            name: rename
        }).then(()=>{
            toast({
                title: "Renamed Successfully!",
                description: "Your Endpoint got deleted Successfully.",
              })
        })
    }


    return (
        <div className="p-4">
            <Toaster className="bg-white rounded-[8px]"/>
            <h1 className="text-xl font-bold">All Endpoints ({endpoints.length})</h1>

            <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 p-4">
                {(endpoints == null) ? null
                    : endpoints.map(en => <div key={en.id} class=" flex flex-col gap-4 p-8  bg-white border border-gray-200 rounded-[8px] shadow dark:bg-gray-800 dark:border-gray-700">

                        <div className="w-full flex justify-between">
                            <p className="text-xs font-semibold rounded-[8px] w-24 text-center justify-start px-2 overflow-hidden flex items-center bg-emerald-200">{en.domainName}</p>
                            <Switch className="bg-red-500 text-red-500" checked={en.active} onCheckedChange={() => handleActive(en.id, en.active)} />
                        </div>
                        <h1 class="my-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white flex gap-2">
                            {en.name} 
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <button ><LucideEdit2 className="text-emerald-600 " size={16}/></button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-white rounded-[8px]">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Rename the Endpoint</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            <input type="text" name="" className=" focus:ring-emerald-500 focus:ring-2 focus:outline-none p-2 w-full border-2 rounded-[8px]" placeholder="Acme Inc" onChange={(e)=>setRename(e.target.value)} required />
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="rounded-[8px] outline-none border-0">Cancel</AlertDialogCancel>
                                        <AlertDialogAction className="bg-emerald-600 hover:bg-emerald-200 hover:text-slate-950 text-white rounded-[8px]"><button onClick={() => renameEndpoint(en.id)}>Rename</button></AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </h1>

                        <CopyToClipboard text={en.id}></CopyToClipboard>

                        <div className="w-full flex justify-between items-center">
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <button className="mt-2"><Trash2 color="red" size={16} /></button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-white rounded-[8px]">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your Endpoint
                                            and remove your data from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="rounded-[8px]">Cancel</AlertDialogCancel>
                                        <AlertDialogAction className="bg-red-600 hover:bg-red-200 hover:text-slate-950 text-white rounded-[8px]"><button onClick={() => delEndpoint(en.id)}>Delete</button></AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            <h5 className="text-sm font-light">Responses: {en.Responses}</h5>

                        </div>





                    </div>
                    )
                }
            </div>

        </div>




    )
}
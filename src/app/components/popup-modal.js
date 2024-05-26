"use client"

import { useState } from "react";

const PopupModal = () => {

    const [modalVisible,setmodalVisible] = useState('hidden');
    const [domainName, setDomainName] = useState('');

    async function createEndpoint()
    {

        
    }
    return (

        <div>

        <button onClick={()=>setmodalVisible("flex")}  class="w-full block text-white bg-emerald-600 py-2 rounded-md" type="button">
          New
        </button>
        
        <div id="authentication-modal" class={`${modalVisible} absolute  top-0 right-0 left-0 z-50 justify-center items-center w-screen md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
            <div class="relative p-4 w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Project's Domain Name
                        </h3>
                        <button onClick={()=>setmodalVisible('hidden')} type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div class="p-4 md:p-5">
                        <div class="space-y-4">
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Domain Name</label>
                                <input onChange={(e)=>setDomainName(e.currentTarget.value)} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="https://example.com" required />
                            </div>
                            
                            
                            <button type="submit" class="w-full text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Next</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        </div>


    )
}

export default PopupModal;

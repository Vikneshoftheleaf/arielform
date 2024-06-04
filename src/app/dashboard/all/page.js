'use client'
import EndpointList from "@/components/endpoint-lists";
import { useAuthContext } from "@/context/auth-context";


export default function AllEndpoints()

{
    const {user} = useAuthContext()

    return(
        <EndpointList userID={user.uid} />
    )
}
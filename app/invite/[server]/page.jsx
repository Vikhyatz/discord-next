"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useParams } from 'next/navigation'


// toast
import toast, { Toaster } from 'react-hot-toast';

const page = () => {
    const params = useParams()
    const {data : session, status} = useSession()
    
    const [serverData, setServerData] = useState(null)
    
    useEffect(()=>{
        const fetchServerData = async () => {
            const response = await fetch(`/api/serverDataId?serverId=${params.server}`)
            const data = await response.json()
            setServerData(data.serverData)
        }
        fetchServerData()
    }, [])

    if(status === "loading"){
        return <p>loading..</p>
    }
    if(status === "unauthenticated"){
        return <p>you should probably go an authenticate</p>
    }

    const handleAccept = async ()=>{
        const response = await fetch(`/api/acceptServerInvite?userName=${session.user.name}&serverId=${params.server}`, {method: "POST"})
        const data = await response.json()

        if(response.ok){
            toast.success('You have Joined the server')
        }else{
            toast.error('not able to join the server, try again after some time')
        }
    }


    return (
        <>
        <div className='flex justify-center items-center h-screen w-full bg-[url(https://images.unsplash.com/photo-1557682250-33bd709cbe85?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVycGxlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D)]'>
            <div className=' bg-[#313338] w-[500px] h-[300px] rounded-[5px] flex justify-center items-center text-[#b8b8b8] flex-col'>
                <p>A User Invited you to join</p>
                <h1 className='text-white text-[30px] font-semibold'><div className='bg-[#2B2D31]  mr-[8px] text-[18px] p-[8px] inline rounded-[5px]'>{serverData.serverIcon}</div>{serverData.serverName}</h1>
                <p>{serverData.members.length} {serverData.members.length == 1 ? 'Member' : 'Members'}</p>

                <button onClick={handleAccept} className='bg-[#5865F2] w-[80%] p-[10px] text-white font-medium rounded-[3px] mt-[30px] hover:bg-[#4752C4] transition-all duration-[0.2s]'>Accept Invite</button>
                <Toaster />
            </div>
        </div>
        </>
    )
}

export default page
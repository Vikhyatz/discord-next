"use client"
import React, { useEffect, useState } from 'react'
import { usePathname, redirect, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { channelModalContext } from '@/app/context/channelContext';
import Link from 'next/link';

import SideNav1 from '../../components/SideNav1';
import SideNav2 from '../../components/SideNav2';

const Page = () => {
    const { data: session , status} = useSession()
    const params = useParams();
    const pathname = usePathname()

    const [channelUpdate, setChannelUpdate] = useState("update")
    const [statusCode, setStatusCode] = useState(0)
    const [notAbleToAccess, setnotAbleToAccess] = useState(0)

    const slug = decodeURIComponent(params.slug);


    useEffect(() => {
        const checkServerAndMember = async () => {
            const response = await fetch(`/api/checkServerAndMember?serverName=${slug}&user=${session.user.name}`)
            if(session == undefined){
                setnotAbleToAccess(403)
            }
            console.log(session)
            console.log(response)
            setStatusCode(response.status)
            
        }
        if(status == "authenticated"){
            checkServerAndMember()
        }
    }, [session])



    if (status === "loading" || statusCode == 0) return <p>loading..</p>
    if (status === "unauthenticated") return <p>you should probably go an authenticate</p>
    if(statusCode === 404) return <h1 className='text-[40px]'>this server doesn't exist, please go back to <Link href="/" >home</Link></h1>
    if(statusCode === 403) return <h1 className='text-[40px]'>YOU cannot access this server, please go back to <Link href="/" >home</Link></h1>
    if(notAbleToAccess === 403) return <h1 className='text-[40px] mt-[10px]'>Not able to access this server, please go back to <Link href="/" className='border-[2px] border-solid border-black p-[5px] rounded-[10px] bg-black text-white' >home</Link></h1>



    return (
        <>
            <channelModalContext.Provider value={{ channelUpdate, setChannelUpdate }}>
                <div className='w-full h-[100vh] flex bg-[#313338] overflow-hidden'>
                    <SideNav1 pathname={pathname} />
                    <SideNav2 pathname={pathname} type="server" serverSlug={slug} />

                    <main className="relative w-[calc(100%-312px)] flex justify-center items-center flex-col">
                        <h1 className='text-white text-[40px] font-bold'>Welcome to {slug}</h1>
                        <h2 className='text-white text-[30px]'>Select Channels To talk</h2>
                    </main>

                </div >
            </channelModalContext.Provider>
        </>
    )



}

export default Page
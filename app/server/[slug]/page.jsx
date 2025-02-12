"use client"
import React, { useEffect, useState } from 'react'
import { usePathname, redirect, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { channelModalContext } from '@/app/context/channelContext';
import Link from 'next/link';

import SideNav1 from '../../components/SideNav1';
import SideNav2 from '../../components/SideNav2';
import Loading from '@/app/components/Loading';
import Error from '@/app/components/Error';

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
            setStatusCode(response.status)
            
        }
        if(status == "authenticated"){
            checkServerAndMember()
        }
    }, [session])



    if (status === "loading" || statusCode == 0) return <Loading/>
    if (status === "unauthenticated") return <Error text="you should probably go an authenticate" />
    if(statusCode === 404) return <Error text="this server does not exist, please go back to home" />
    if(statusCode === 403) return <Error text="YOU cannot access this server, please go back to home" />
    if(notAbleToAccess === 403) return <Error text="Not able to access this server, please go back to home" />



    return (
        <>
            <channelModalContext.Provider value={{ channelUpdate, setChannelUpdate }}>
                <div className='w-full h-[100vh] flex bg-[#1c1f26] overflow-hidden'>
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
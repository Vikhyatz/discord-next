"use client"
import React, { useState } from 'react'
import { usePathname, redirect, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { channelModalContext } from '@/app/context/channelContext';

// TODO:
// fetch real channels from the server and render them

import SideNav1 from '../../components/SideNav1';
import SideNav2 from '../../components/SideNav2';

const Page = () => {

    const params = useParams();
    const { data: session } = useSession()
    if (!session) {
        redirect('/')
    }
    const pathname = usePathname()

    const [channelUpdate, setChannelUpdate] = useState("update")

    const slug = decodeURIComponent(params.slug);
    return (
        <>
        <channelModalContext.Provider value={{channelUpdate, setChannelUpdate}}>
            <div className='w-full h-[100vh] flex bg-[#313338] overflow-hidden'>
                <SideNav1 pathname={pathname} />
                <SideNav2 pathname={pathname} type="server" serverSlug={slug} />

                <main className="relative w-[calc(100%-312px)] flex justify-center items-center">
                    {/* just a nice welcome, nothing to show here, select the channels to talk */}
                    <h1>Select Channels To talk</h1>
                </main>


            </div >
            </channelModalContext.Provider>
        </>
    )
}

export default Page
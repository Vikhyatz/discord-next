"use client"
import React from 'react'
import { usePathname, redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

import SideNav1 from '../components/SideNav1';
import SideNav2 from '../components/SideNav2';

const page = () => {

    const { data: session } = useSession()
    if (!session) {
        redirect('/')
    }
    const pathname = usePathname()
    return (
        <>
            <div className='w-full h-[100vh] flex bg-[#313338] overflow-hidden'>
                <SideNav1 pathname={pathname} />
                <SideNav2 pathname={pathname} type="server" />

                <main className="relative w-[calc(100%-312px)]">
                    <div className="flex items-center w-full h-11 bg-[#313338] border-b-[1.5px] border-[#131313] text-white font-semibold text-base">
                        <p className='text-[grey] text-[26px] pl-[10px] ml-[10px]'>#</p>
                        <p className="ml-[10px]">General</p>
                    </div>

                    <div className="absolute bottom-[75px] w-full max-h-[81%] overflow-auto">
                        <div className="flex items-center mb-2 ml-5">
                            <div className="w-10 h-10">
                                <img
                                    src="https://cdn.discordapp.com/avatars/724603106700296302/4d6cde241aa4504856dad566b2ff92a5.webp?size=80"
                                    alt="pfp"
                                    className="rounded-full"
                                />
                            </div>
                            <div className="ml-4">
                                <div className="flex items-baseline">
                                    <p className="text-[#f2f3f5] font-semibold">vikhyatz</p>
                                    <p className="ml-4 text-[13px] text-[#808080] font-semibold scale-y-95">
                                        23/09/2023 00:39
                                    </p>
                                </div>
                                <div className="text-[#dbdee1]">Oi</div>
                            </div>
                        </div>

                        <div className="flex items-center mb-2 ml-5">
                            <div className="w-10 h-10">
                                <img
                                    src="https://res.cloudinary.com/anyanime/image/upload/5eff0d8049bbdf8df8dc0762c4f526c0Kurizu39.png"
                                    alt="pfp"
                                    className="rounded-full"
                                />
                            </div>
                            <div className="ml-4">
                                <div className="flex items-baseline">
                                    <p className="text-[#f2f3f5] font-semibold">BeastCodZ</p>
                                    <p className="ml-4 text-[13px] text-[#808080] font-semibold scale-y-95">
                                        23/09/2023 00:39
                                    </p>
                                </div>
                                <div className="text-[#dbdee1]">Hop</div>
                            </div>
                        </div>
                    </div>

                    <form className="absolute bottom-5 left-5 flex items-center bg-[#383A40] rounded-lg w-[94%] h-11">
                        <input
                            type="text"
                            name="message"
                            placeholder="Message @BeastCodZ"
                            autoComplete="off"
                            className="w-full bg-transparent text-white text-sm px-4 outline-none"
                        />
                    </form>
                </main>


            </div >
        </>
    )
}

export default page
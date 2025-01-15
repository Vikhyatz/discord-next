"use client"
import React from 'react'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { redirect, usePathname } from 'next/navigation';
import Allfriends from '@/app/components/Allfriends';
import Requests from '@/app/components/Requests';
import Addfriend from '@/app/components/Addfriend';

import SideNav1 from '@/app/components/SideNav1';
import SideNav2 from '@/app/components/SideNav2';

// icons
import { FaUser } from "react-icons/fa6"


const Page = () => {
  const { data: session } = useSession()
  // if(!session){
  //   redirect('/')
  // }
  const pathname = usePathname()
  // console.log(session)

  const [state, setstate] = useState("all")

  return (
    <>
      <div className='w-full h-[100vh] flex bg-[#313338] overflow-hidden'>
        <SideNav1 pathname={pathname}/>
        <SideNav2 pathname={pathname} type="dm"/>

        <main className="relative w-[calc(100%-312px)]">
          <div className="flex items-center w-full h-[45px] bg-[#313338] border-b-[1.5px] border-[#202020] text-white font-semibold text-base">

            <div className='flex items-center text-[#949Ba4] transition-all duration-[0.1s]'>
              <FaUser size={18} className='ml-[20px]' />
              <p className='ml-[10px]'>Friends</p>
            </div>

            <div className='h-[24px] w-[2px] bg-[#6d6f77] mx-[10px]'></div>

            <div className='flex gap-[20px] ml-[10px]'>
              <button onClick={() => { setstate("all") }}
                className={`px-[14px] py-[1px] hover:bg-[#45494f] hover:text-white rounded-[5px] text-[#949Ba4] ${state === "all" && 'bg-[#45494f] text-white'}`}>All</button>

              <button onClick={() => { setstate("requests") }} className={`px-[14px] py-[1px] hover:bg-[#45494f] hover:text-white rounded-[5px] text-[#949Ba4] ${state === "requests" && 'bg-[#45494f] text-white'}`}>Requests</button>

              <button onClick={() => { setstate("addFriends") }} className={`px-[8px] py-[1px] text-white bg-[#248045] rounded-[5px] ${state === "addFriends" && 'text-[#2ca157] bg-transparent'}`}>Add Friends</button>

            </div>

          </div>
          <div>
            {state === "all" && <Allfriends />}
            {state === "requests" && <Requests />}
            {state === "addFriends" && <Addfriend />}
          </div>


        </main>



      </div>
    </>
  )
}

export default Page

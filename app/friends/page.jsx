"use client"
import React from 'react'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/router';
import { redirect, usePathname } from 'next/navigation';
import Allfriends from '@/app/components/Allfriends';
import Requests from '@/app/components/Requests';
import Addfriend from '@/app/components/Addfriend';



import SideNav1 from '@/app/components/SideNav1';
import SideNav2 from '@/app/components/SideNav2';

import { requestModalContext } from '../context/reqContext'
import { serverContext } from '../context/serverContext';

// icons
import { FaUser } from "react-icons/fa6"
import Loading from '../components/Loading';
import Error from '../components/Error';


const Page = () => {
  const pathname = usePathname()

  const [state, setstate] = useState("all")
  const [reqModal, setReqModal] = useState("close")
  
  const { data: session, status } = useSession();
  
  // Redirect if the session is not available
  if (status === "loading") return <Loading/>;
  if (status === "unauthenticated") return <Error text="You should probably go authenticate" />

  return (
    <>
    <requestModalContext.Provider value={{reqModal, setReqModal}} >
      
      <div className='w-full h-[100vh] flex bg-[#1c1f26] overflow-hidden'>
        <SideNav1 pathname={pathname}/>
        <SideNav2 pathname={pathname} type="dm"/>

        <main className="relative w-[calc(100%-332px-40px)] h-[calc(100vh-30px)] ml-[10px] mt-[15px] rounded-[20px] bg-[#16181d]">
          <div className="flex items-center w-full h-[45px] text-white font-semibold text-base">

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
      </requestModalContext.Provider>
    </>
  )
}

export default Page

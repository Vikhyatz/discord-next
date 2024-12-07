"use client"
import React from 'react'
import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Navlinks from '../../components/Navlinks';
import Image from 'next/image';
import Allfriends from '@/app/components/Allfriends';
import Requests from '@/app/components/Requests';
import Addfriend from '@/app/components/Addfriend';

// icons
import { FaDiscord,FaBell, FaGithub } from "react-icons/fa";
import { FaPlus, FaGear, FaUser } from "react-icons/fa6"

const page = () => {
  const pathname = usePathname()

  const [state, setstate] = useState("all")

  return (
    <>
      <div className='w-full h-[100vh] flex bg-[#313338] overflow-hidden'>
        <nav className='bg-[#1E1F22] w-[72px] h-[100vh] flex items-center flex-col'>

          <Navlinks pathname={pathname} name={<FaDiscord size={25} />} href="/dm/friends" color="#5865F2" />

          <div className="w-[30px] h-[2px] bg-[#34363B] mt-[10px]"></div>

          {/* server list */}
          <Navlinks pathname={pathname} name="vs" href="/blah" color="#5865F2" />
          <Navlinks pathname={pathname} name="ops" href="/blah" color="#5865F2" />
          <Navlinks pathname={pathname} name="rs" href="/blah" color="#5865F2" />

          <Navlinks pathname={pathname} name={<FaPlus size={25} />} type="CreateServerModal" href="" color="#23A559" />

          <div className="w-[30px] h-[2px] bg-[#34363B] mt-[10px]"></div>

          <Navlinks pathname={pathname} name={<FaGithub size={25} />} href="https://github.com/Vikhyatz" color="red" />
        </nav>

        {/* servers nav */}
        <div className='w-[240px] h-[100vh] bg-[#2B2D31] flex items-center flex-col relative'>
          <Link
            href="/dm/friends"
            className={clsx(
              `w-[224px] h-[42px] flex items-center text-[#949Ba4] rounded-[3px] my-[10px] transition-all duration-[0.1s] mt-[10px] hover:bg-[#3F4248] hover:text-white`,
              pathname === '/dm/friends' && `bg-[#3F4248] text-white`
            )}
          >
            <FaUser size={20} className='ml-[20px]' />
            <p className='ml-[10px]'>Friends</p>
          </Link>

          <p className="w-[200px] text-[#949Ba4] text-[13px] font-bold p-[10px] pt-[15px] cursor-default mb-[10px] border-b-[1.5px] border-b-solid border-b-[#131313] scale-y-[0.96] hover:text-white">DIRECT MESSAGES</p>

          {/* <% user.friends.forEach(function(friend) { %> */}
          {/* <!-- dynamically generated friends --> */}
          <div className="friends">
            <div className="img">
              {/* <img src="<%= friend.profilePicture %>" alt="pfp"> */}
            </div>
            <p>
              {/* <%= friend.username %> */}
            </p>
          </div>
          {/* <% }) %> */}
          {/* TODO: these friends selector in direct messages */}


          {/* user info below in the side nav */}
          <div className="w-full h-[52px] bg-[#232428] absolute bottom-0 flex justify-between items-center text-[#f2f3f5]">
            <div className="flex items-center transition-all duration-[0.2s] p-[5px] rounded-[5px] ml-[10px] w-[150px] hover:bg-[#3c3e44]">
              <div className="w-[32px] h-[32px] rounded-[50%] overflow-hidden ml-[10px]">
                {/* <img src="<%= user.profilePicture %>" alt="pfp"> */}
                <img
                  alt='pfp'
                  className='w-[32px]'
                  src="https://res.cloudinary.com/anyanime/image/upload/Luffy-anime-boy-PFPKurizu46.png"
                />
              </div>
              <p className='ml-[10px]'>
                Vikhyatz
              </p>
            </div>
            <FaGear size={40} className='mr-[20px] p-[12px] transition-all duration-[0.2s] rounded-[5px] hover:bg-[#3c3e44]' />
          </div>
        </div>

        <main className="relative w-[calc(100%-312px)]">
            <div className="flex items-center w-full h-[45px] bg-[#313338] border-b-[1.5px] border-[#202020] text-white font-semibold text-base">

              <div className='flex items-center text-[#949Ba4] transition-all duration-[0.1s]'>
                <FaUser size={18} className='ml-[20px]' />
                <p className='ml-[10px]'>Friends</p>
              </div>

              <div className='h-[24px] w-[2px] bg-[#6d6f77] mx-[10px]'></div>

              <div className='flex gap-[20px] ml-[10px]'>
                <button onClick={()=>{setstate("all")}}
                className={`px-[14px] py-[1px] hover:bg-[#45494f] hover:text-white rounded-[5px] text-[#949Ba4] ${state === "all" && 'bg-[#45494f] text-white'}`}>All</button>

                <button onClick={()=>{setstate("requests")}} className={`px-[14px] py-[1px] hover:bg-[#45494f] hover:text-white rounded-[5px] text-[#949Ba4] ${state === "requests" && 'bg-[#45494f] text-white'}`}>Requests</button>

                <button onClick={()=>{setstate("addFriends")}} className={`px-[8px] py-[1px] text-white bg-[#248045] rounded-[5px] ${state === "addFriends" && 'text-[#2ca157] bg-transparent'}`}>Add Friends</button>

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

export default page
"use client"
import React from 'react'
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Navlinks from '../components/Navlinks';
import Image from 'next/image';

// icons
import { FaDiscord } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6"
import { FaBell } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";

const page = () => {
    const pathname = usePathname()
  return (
    <>
    <div className='w-full h-[100vh] flex bg-[#313338] overflow-hidden'>
    <nav className='bg-[#1E1F22] w-[72px] h-[100vh] flex items-center flex-col'>

        <Navlinks pathname={pathname} name={<FaDiscord size={25}/>} href="/dm" color="#5865F2"/>

        <div className="w-[30px] h-[2px] bg-[#34363B] mt-[10px]"></div>


        {/* server list */}
        <Navlinks pathname={pathname} name="vs" href="/blah" color="#5865F2"/>
        <Navlinks pathname={pathname} name="ops" href="/blah" color="#5865F2"/>
        <Navlinks pathname={pathname} name="rs" href="/blah" color="#5865F2"/>

        <Navlinks pathname={pathname} name={<FaPlus size={25}/>} href="/blah" color="#23A559"/>

        <div className="w-[30px] h-[2px] bg-[#34363B] mt-[10px]"></div>

        <Navlinks pathname={pathname} name={<FaGithub size={25}/>} href="/blah" color="#23A559"/>
        
        <Navlinks pathname={pathname} name={<FaBell size={25}/>} href="/blah" color="#23A559"/>
    </nav>

    {/* servers nav */}

    <div className='w-[240px] h-[100vh] bg-[#2B2D31] flex items-center flex-col relative'>
        <Link
        href="/dm/friends"
        className={clsx(
          `w-[224px] h-[42px] flex items-center text-[#949Ba4] rounded-[5px] my-[10px] transition-all duration-[0.1s] mt-[20px] hover:bg-[#3F4248] hover:text-white`,
          pathname === '/dm/friends' && `bg-[#3F4248] text-white`
      )}
        >
            <FaUser size={24} className='ml-[20px]'/>
            <p className='ml-[10px]'>Add Friends</p>
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
                <FaGear size={40} className='mr-[20px] p-[12px] transition-all duration-[0.2s] rounded-[5px] hover:bg-[#3c3e44]'/>
            </div>
    </div>

    <main className="relative w-[calc(100%-312px)]">
  <div className="flex items-center w-full h-11 bg-[#313338] border-b-[1.5px] border-[#131313] text-white font-semibold text-base">
    <div className="w-6 h-6 ml-[20px]">
      <img
        src="https://res.cloudinary.com/anyanime/image/upload/5eff0d8049bbdf8df8dc0762c4f526c0Kurizu39.png"
        alt="pfp"
        className="rounded-full"
      />
    </div>
    <p className="ml-2">BeastCodZ</p>
    <div className="w-1.5 h-1.5 ml-2 bg-gray-500 rounded-full"></div>
    <p className="ml-4 text-[13px] text-[#808080] font-semibold">@BeastCodZ645</p>
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


      {/* the send button */}
    {/* <button
      type="submit"
      className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center transition-transform hover:scale-105"
    >
      <i className="fa-solid fa-paper-plane text-white"></i>
    </button> */}
  </form>
</main>


</div>
    </>
  )
}

export default page
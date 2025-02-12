import React, { useState } from 'react'
import { IoCheckmarkOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { useSession } from 'next-auth/react';
import RequestModal from './RequestModal';

const Friend = ({src, name, type, onUpdate, setModal}) => {
    const {data : session} = useSession();

    // function to fetch POST routes for friend requests
    const handleRequestAcception = async ()=>{
        // handle sending data to approve the request
        const response = await fetch(`/api/requests?type=acception&current=${session.user.name}&sender=${name}`, {method: 'POST'})
        const data = await response.json();
        console.log(data)
        setModal("openAccept")
        onUpdate();
    }

    const handleRequestRejection = async () => {
        // handle sending data to reject the request
        const response = await fetch(`/api/requests?type=rejection&current=${session.user.name}&sender=${name}`, {method: 'POST'})
        const data = await response.json();
        console.log(data)
        setModal("openReject")
        onUpdate()
    }

    const handleRemoveFriend = async () => {
        const response = await fetch(`api/rmFriend?current=${session.user.name}&rmfriend=${name}`, {method: 'POST'})
        const data = await response.json();
        console.log(data)
        onUpdate()
    }

    return (
        <div className="w-[60%] h-[60px] flex justify-around items-center border-t-[1px] border-t-[#393b4138] hover:bg-[#393b4126] hover:rounded-[20px]">
            <div className='flex items-center justify-center '>
                <div className="w-[32px] h-[32px] ml-[20px]">
                    <img
                        src={src}
                        alt="pfp"
                        className="rounded-full"
                    />
                </div>
                <p className="ml-2 text-[15px] font-semibold">{name}</p>
            </div>

            {
                type === "all" && 
                <div className='hover:bg-[#9d282c] hover:text-[#dad9d9] text-[#DA373C] rounded-[5px] w-[150px] h-[30px] bg-[#111214] flex justify-center items-center border-[5px] border-[#111214] cursor-pointer' onClick={handleRemoveFriend}>
                    Remove Friend
                </div>
            }
            {
                type === "request" &&
                <>
                <div className='flex gap-[15px]'>
                    <div className='hover:text-[lime] rounded-full w-[35px] h-[35px] bg-[#292c30] flex justify-center items-center' onClick={handleRequestAcception}>
                        <IoCheckmarkOutline size={20} />
                    </div>
                    <div className='hover:text-[red] rounded-full w-[35px] h-[35px] bg-[#292c30] flex justify-center items-center' onClick={handleRequestRejection}>
                        <RxCross1 size={20} />
                    </div>
                </div>
                </>
            }
            
            
        </div>
    )
}

export default Friend
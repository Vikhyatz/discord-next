import React from 'react'
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import Link from 'next/link';

const RequestModal = ({ setmodal, type }) => {


    return (
        <div className={`w-[100vw] h-[100vh] absolute left-[-312px] top-0 bg-[#00000092] flex justify-center items-center z-50`} >
            <div className='w-[23%] h-[58%] rounded-[10px] bg-[#313338] flex flex-col items-center'>
                <div className='w-full h-[50px] flex items-center justify-end text-white cursor-pointer' onClick={() => { setmodal("close") }}>
                    <RxCross1 size={24} className='mr-[20px]' />
                </div>
                <h1 className='text-[lime] text-center flex justify-center items-center w-[100%] h-[30%] mt-[90px] text-xl'>
                    {type === "accept" && <FaCheck size={50} className='text-[lime]' />}
                    {type === "removedFriend" && <FaCheck size={50} className='text-[lime]' />}
                    {type === "reject" && <RxCross1 size={50} className='text-[red]' />}
                </h1>
                <h1 className='text-[#b5bac1] text-center w-[90%] mt-[10px] text-xl'>
                    {type === "accept" && "The request is accepted"}
                    {type === "reject" && "The request is rejected"}
                    {type === "removedFriend" && "Friend removed"}
                </h1>
            </div>

        </div>
    )
}

export default RequestModal
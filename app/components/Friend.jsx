import React from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import { IoCheckmarkOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

const Friend = ({src, name, type}) => {
    return (
        <div className="w-[60%] h-[60px] flex justify-around items-center border-t-[1px] border-t-[#393B41] hover:bg-[#393B41] hover:rounded-[10px] gap-[300px]">
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
                <div className='hover:bg-[#a12121] hover:text-[#afafaf] rounded-[5px] w-[70px] h-[30px] bg-[#292c30] flex justify-center items-center'>
                    <FaRegTrashAlt size={20} />
                </div>
            }
            {
                type === "request" &&
                <>
                <div className='flex gap-[15px]'>
                    <div className='hover:text-[lime] rounded-full w-[35px] h-[35px] bg-[#292c30] flex justify-center items-center'>
                        <IoCheckmarkOutline size={20} />
                    </div>
                    <div className='hover:text-[red] rounded-full w-[35px] h-[35px] bg-[#292c30] flex justify-center items-center'>
                        <RxCross1 size={20} />
                    </div>
                </div>
                
                </>
            }
        </div>
    )
}

export default Friend
import React from 'react'

import { BsThreeDotsVertical } from "react-icons/bs";

const Friend = ({src, name}) => {
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
            <div className='hover:bg-[#1d1f21] rounded-full w-[30px] h-[30px] bg-[#292c30] flex justify-center items-center'>
                <BsThreeDotsVertical size={20} />
            </div>
        </div>
    )
}

export default Friend
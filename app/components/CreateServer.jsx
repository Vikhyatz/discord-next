import React from 'react'
import { RxCross1 } from "react-icons/rx";
import Link from 'next/link';

const CreateServer = ({ setmodal }) => {
    return (
        <div className='w-full h-[100vh] absolute left-0 top-0 bg-[#00000092] flex justify-center items-center z-50' >
            <div className='w-[23%] h-[58%] rounded-[5px] bg-[#313338] flex flex-col items-center'>
                <div className='w-full h-[50px] flex items-center justify-end text-white cursor-pointer' onClick={()=>{setmodal("close")}}>
                    <RxCross1 size={24} className='mr-[20px]'/>
                </div>
                <h1 className='text-[#f2f3f5] font-bold text-[20px]'>Vikhyatz, Create Your Server</h1>
                <p className='text-[#b5bac1] text-center w-[90%] mt-[10px]'>Give your new server a personality with new name. You can never change it later</p>
                <p className='text-[#b5bac1] font-bold w-full text-left ml-[40px] mt-[20px]'>SERVER NAME</p>
                <input className='h-[40px] w-[95%] outline-0 border-0 bg-[#1E1F22] rounded-[5px] p-[10px] text-[white] text-[16px]' type="text" placeholder="Your server's name"/>
                <p className='text-[#949BA4] w-full text-center mt-[20px] text-[14px]'>By creating a server, you agree to Discord clone's <Link href="/guidlines" className='underline text-[#008afc]'>Community Guidelines</Link></p>
                <button className='p-[10px] bg-[#5865F2] text-[#ffff] outline-0 border-0 rounded-[5px] mt-[15px] transition-all duration-[0.2s] cursor-pointer'>Create Server</button>
            </div>
        </div>
    )
}

export default CreateServer
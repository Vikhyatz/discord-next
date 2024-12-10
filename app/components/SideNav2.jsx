import React, {useState} from 'react'
import Link from 'next/link'
import DmFriend from './DmFriend'
import clsx from 'clsx'

import CreateModal from './CreateModal'
import Navlinks from './Navlinks'

import { FaGear, FaUser, FaPlus } from "react-icons/fa6"
import Channel from './Channel'


const SideNav2 = ({ pathname, type }) => {

    const [modal, setModal] = useState("close");

    return (
        <div className='w-[240px] h-[100vh] bg-[#2B2D31] flex items-center flex-col relative'>

            {type === "dm" && <Link
                href="/friends/"
                className={clsx(
                    `w-[224px] h-[42px] flex items-center text-[#949Ba4] rounded-[3px] my-[10px] transition-all duration-[0.1s] mt-[10px] hover:bg-[#3F4248] hover:text-white`,
                    pathname === '/dm/friends' && `bg-[#3F4248] text-white`
                )}
            >
                <FaUser size={20} className='ml-[20px]' />
                <p className='ml-[10px]'>Friends</p>
            </Link>}

            {type === "server" && <div className='w-[224px] h-[42px] flex items-center text-white rounded-[3px] my-[10px] transition-all duration-[0.1s] mt-[10px] hover:bg-[#3F4248] hover:text-white'><span className='ml-[20px]'>Vikhyat's server</span></div>}

            {type === "dm" && <div className="w-[200px] text-[#949Ba4] text-[13px] font-bold p-[10px] pt-[15px] cursor-default mb-[10px] border-b-[1.5px] border-b-solid border-b-[#131313] scale-y-[0.96] hover:text-white">DIRECT MESSAGES</div>}

            {/* this modal is not working */}
            {/* <Navlinks pathname={pathname} name={<FaPlus size={25} />} type="CreateChannelModal" href="" color="#23A559" /> */}
            {type === "server" &&
                <div className="w-[200px] text-[#949Ba4] text-[13px] flex justify-between items-center font-bold p-[10px] pt-[15px] cursor-default mb-[10px] border-b-[1.5px] border-b-solid border-b-[#131313] scale-y-[0.96] hover:text-white" onClick={()=>{setModal("open")}}>
                    TEXT CHANNELS <FaPlus />
                </div>
            }
            {
                modal === "open" && <CreateModal setmodal={setModal} type="channel" />
            }

            {type === "dm" && <><DmFriend /> <DmFriend /> <DmFriend /> <DmFriend /></>}
            {type === "server" && <><Channel /><Channel /><Channel /><Channel /></>}

            <div className="w-full h-[52px] bg-[#232428] absolute bottom-0 flex justify-between items-center text-[#f2f3f5]">
                <div className="flex items-center transition-all duration-[0.2s] p-[5px] rounded-[5px] ml-[10px] w-[150px] hover:bg-[#3c3e44]">
                    <div className="w-[32px] h-[32px] rounded-[50%] overflow-hidden ml-[10px]">
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
    )
}

export default SideNav2
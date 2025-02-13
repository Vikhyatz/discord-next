import React, { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import DmFriend from './DmFriend'
import clsx from 'clsx'

import { signOut } from "next-auth/react"

import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import { Tooltip } from 'react-tooltip'

import CreateModal from './CreateModal'
import Navlinks from './Navlinks'

// toast
import toast, { Toaster } from 'react-hot-toast';

import { useSession } from 'next-auth/react'

import { FaGear, FaUser, FaPlus } from "react-icons/fa6"
import { IoIosLogOut } from "react-icons/io";
import { FaCopy } from "react-icons/fa";

import Channel from './Channel'
import { requestModalContext } from '../context/reqContext'
import { channelModalContext } from '../context/channelContext'
import { redirect } from 'next/navigation';


const SideNav2 = ({ pathname, type, serverSlug }) => {
    const { data: session } = useSession()
    const [friends, setFriends] = useState([{ name: "Loading..." }])
    const [channelModal, setChannelModal] = useState("close");

    const [channels, setChannels] = useState([{ channelName: "loading..." }])
    const [serverOwner, setServerOwner] = useState("")
    const [serverId, setServerId] = useState("")

    // to handle the dropdown, for deleting the server
    const [selected, setSelected] = useState(false)

    const { reqModal, setReqModal } = useContext(requestModalContext)

    const { channelUpdate, setChannelUpdate } = useContext(channelModalContext)


    useEffect(() => {
        const fetchFriends = async () => {
            const response = await fetch(`/api/friends?current=${session.user.name}`);
            const data = await response.json();
            // console.log("this is the data for the direct messages: ", data)
            setFriends(data.user.friends);
        }
        fetchFriends()
    }, [reqModal])

    useEffect(() => {
        const fetchChannels = async () => {
            if (type === "server") {
                const response = await fetch(`/api/serverData?server=${decodeURIComponent(serverSlug)}`)
                const data = await response.json()
                console.log("this is the data of channels from the server", data)
                setChannels(data.serverData.channel)
                setServerOwner(data.serverData.serverOwner.name)
                setServerId(data.serverData._id)
                // console.log("the server owner value will be: ", data.serverData.serverOwner.name)
            }
        }

        fetchChannels();
    }, [channelUpdate])

    // function to handle server deletion
    const deleteServer = async () => {
        const response = await fetch(`/api/deleteServer?serverName=${serverSlug}`)
        const data = await response.json()
        // console.log(data)
        toast.success('deleted server')
        setTimeout(() => {
            redirect('/friends')

        }, 1000);
    }

    if (type === "dm") {
        if (!Array.isArray(friends)) {
            return ("loading....")
        }
    }

    if (type === "server") {
        if (!Array.isArray(channels)) {
            return ("Loading....")
        }
    }

    const copyLink = () => {
        navigator.clipboard.writeText(`localhost:3000/invite/${serverId}`);
        toast.success('Copied Link!')
    }


    return (
        <div className='flex flex-col'>
            {/* height of this div = screen - empty space - height of profile below - empty space */}
            <div className='w-[240px] h-[calc(100vh-30px-52px-15px)] mt-[15px] bg-[#16181d] ml-[20px] rounded-[20px] flex items-center flex-col relative'>

                {type === "dm" && <Link
                    href="/friends/"
                    className={clsx(
                        `w-[224px] h-[42px] flex items-center text-[#949Ba4] rounded-[15px] my-[10px] transition-all duration-[0.1s] mt-[10px] hover:bg-[#3f424852] hover:text-white`,
                        pathname === `/dm/friends` && `bg-[#3F4248] text-white`
                    )}
                >
                    <FaUser size={20} className='ml-[20px]' />
                    <p className='ml-[10px]'>Friends</p>
                </Link>}

                {type === "server" &&
                    <>
                        <div className={`w-[224px] h-[42px] flex items-center text-white rounded-[15px] mt-[10px] transition-all duration-[0.1s] hover:bg-[#3f424852] hover:text-white relative cursor-pointer select-none ${selected && "bg-[#3f4248] text-white"} `} onClick={() => { setSelected(!selected) }} >
                            <span className='ml-[20px]'>{serverSlug}</span>

                            {/* conditionally rendering the arrow button, will only render for the owner of the server */}
                            {
                                selected ? (<MdKeyboardArrowUp className='absolute right-[20px]' size={30} />) : (<MdKeyboardArrowDown className='absolute right-[20px]' size={30} />)
                            }

                        </div>
                        {/* dropdown  */}
                        {selected &&
                            <div className='bg-[#3F4248] w-[224px] flex items-center flex-col p-[10px] gap-[10px]'>
                                {serverOwner == session.user.name &&
                                    <button onClick={deleteServer} className='bg-[black] w-[184px] h-[42px] transition-all duration-[0.1s] rounded-[5px] text-[red] flex items-center justify-center select-none hover:bg-[red] hover:text-white '>Delete Server <MdDelete className='inline ml-[30px] z-[50]' size={20} /></button>
                                }


                                <button onClick={copyLink} className='bg-[#fff] w-[184px] h-[42px] transition-all duration-[0.1s] rounded-[5px] text-[black] flex items-center justify-center select-none hover:bg-[black] hover:text-white '>Invite Link <FaCopy className='inline ml-[30px] z-[50]' /> </button>
                                <Toaster />
                            </div>
                        }
                    </>
                }

                {type === "dm" && <div className="w-[200px] text-[#949Ba4] text-[13px] font-bold p-[10px] pt-[15px] cursor-default mb-[10px] border-b-[1.5px] border-b-solid border-b-[#131313] scale-y-[0.96] hover:text-white">DIRECT MESSAGES</div>}

                {/* this modal is not working */}
                {/* <Navlinks pathname={pathname} name={<FaPlus size={25} />} type="CreateChannelModal" href="" color="#23A559" /> */}
                {type === "server" &&
                    <div className="w-[200px] text-[#949Ba4] text-[13px] flex justify-between items-center font-bold p-[10px] pt-[15px] mb-[10px] border-b-[1.5px] border-b-solid border-b-[#131313] scale-y-[0.96] hover:text-white select-none cursor-pointer" onClick={() => { serverOwner === session.user.name && setChannelModal("open") }}>
                        TEXT CHANNELS {serverOwner === session.user.name ? <FaPlus /> : null}
                    </div>
                }
                {
                    channelModal === "open" && <CreateModal setmodal={setChannelModal} type="channel" serverName={serverSlug} />
                }


                {/* friends list for the dms page */}
                {
                    type === "dm" &&
                    friends.map((friend, index) => {
                        return <DmFriend key={index} name={friend.name} link={`/friends/dm/${friend.name}`} />
                    })
                }


                {/* server channels for the server page */}
                {
                    type === "server" &&
                    channels.map((channel, index) => {
                        return <Channel key={index} name={channel.channelName} link={`/server/${serverSlug}/${channel.channelName}`} />
                    })
                }

            </div>
            <div className="w-[240px] h-[52px] bg-[#16181d] rounded-[20px] ml-[20px] mt-[15px] flex justify-between items-center text-[#f2f3f5]">
                <Tooltip id="my-tooltip" />
                <div className="flex items-center transition-all duration-[0.2s] p-[5px] ml-[10px] w-[150px] hover:bg-[#3c3e4480] rounded-[20px]" data-tooltip-id="my-tooltip" data-tooltip-content={session.user.name} data-tooltip-place="top">
                    <div className="w-[32px] h-[32px] rounded-[50%] overflow-hidden ml-[10px]">
                        <img
                            alt='pfp'
                            className='w-[32px]'
                            src={session.user.image}
                        />
                    </div>
                    <p className='ml-[10px] w-[100px] truncate' >
                        {session.user.name}
                    </p>
                </div>
                <IoIosLogOut onClick={() => { signOut() }} size={42} className='text-[red] p-[10px] mr-[20px] rounded-[5px] hover:bg-[#3c3e44]' data-tooltip-id="my-tooltip" data-tooltip-content="Log Out" data-tooltip-place="top" />
            </div>
        </div>
    )
}

export default SideNav2
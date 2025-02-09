import React, {useEffect, useState, useContext} from 'react'
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

import { useSession } from 'next-auth/react'

import { FaGear, FaUser, FaPlus } from "react-icons/fa6"
import { IoIosLogOut } from "react-icons/io";
import Channel from './Channel'
import { requestModalContext } from '../context/reqContext'
import { channelModalContext } from '../context/channelContext'
import { redirect } from 'next/navigation';


const SideNav2 = ({ pathname, type, serverSlug }) => {
    const {data : session} = useSession()
    const [friends, setFriends] = useState([{name: "Loading..."}])
    const [channelModal, setChannelModal] = useState("close");

    const [channels, setChannels] = useState([{channelName: "loading..."}])
    const [serverOwner, setServerOwner] = useState("")

    // to handle the dropdown, for deleting the server
    const [selected, setSelected] = useState(false)
    
    const {reqModal, setReqModal} = useContext(requestModalContext)

    const {channelUpdate, setChannelUpdate} = useContext(channelModalContext)


    useEffect(() => {
        const fetchFriends = async ()=>{
            const response = await fetch(`/api/friends?current=${session.user.name}`);
            const data = await response.json();
            console.log("this is the data for the direct messages: ", data)
            setFriends(data.user.friends);
        }
        fetchFriends()
    }, [reqModal])

    useEffect(()=>{
        const fetchChannels = async ()=>{
            if(type === "server"){
                const response = await fetch(`/api/serverData?server=${decodeURIComponent(serverSlug)}`)
                const data = await response.json()
                console.log("this is the data of channels from the server", data)
                setChannels(data.serverData.channel)
                setServerOwner(data.serverData.serverOwner.name)
                console.log("the server owner value will be: ", data.serverData.serverOwner.name)
            }
        }
        
        fetchChannels();
    }, [channelUpdate])

    // function to handle server deletion
    const deleteServer = async ()=>{
        const response = await fetch(`/api/deleteServer?serverName=${serverSlug}`)
        const data = await response.json()
        console.log(data)
        redirect('/friends')
    }

    if(type === "dm"){
        if(!Array.isArray(friends)){
            return ("loading....")
        }
    }

    if(type === "server"){
        if(!Array.isArray(channels)){
            return ("Loading....")
        }
    }

    console.log(serverOwner)
    console.log(session.user.name)

    return (
        <div className='w-[240px] h-[100vh] bg-[#2B2D31] flex items-center flex-col relative'>

            {type === "dm" && <Link
                href="/friends/"
                className={clsx(
                    `w-[224px] h-[42px] flex items-center text-[#949Ba4] rounded-[3px] my-[10px] transition-all duration-[0.1s] mt-[10px] hover:bg-[#3F4248] hover:text-white`,
                    pathname === `/dm/friends` && `bg-[#3F4248] text-white`
                )}
            >
                <FaUser size={20} className='ml-[20px]' />
                <p className='ml-[10px]'>Friends</p>
            </Link>}

            {type === "server" && 
            <>
            <div className={`w-[224px] h-[42px] flex items-center text-white rounded-[3px] my-[10px] transition-all duration-[0.1s] mt-[10px] hover:bg-[#3F4248] hover:text-white relative cursor-pointer select-none ${selected && "bg-[#3f4248] text-white"} `} onClick={()=>{ serverOwner == session.user.name && setSelected(!selected)} } >
                <span className='ml-[20px]'>{serverSlug}</span>
                {/* {serverOwner == session.user.name
                } */}
                {serverOwner == session.user.name && 
                (
                    selected ? (<MdKeyboardArrowUp className='absolute right-[20px]' size={30}/>) : (<MdKeyboardArrowDown className='absolute right-[20px]' size={30}/>)
                )
                }
                
            </div>
                {/* dropdown  */}
                {selected && 
                <button onClick={deleteServer} className='bottom-[-40px] bg-[black] w-[224px] h-[42px] transition-all duration-[0.1s] rounded-[5px] text-[red] flex items-center justify-center select-none hover:bg-[red] hover:text-white '>Delete Server <MdDelete className='inline ml-[30px] z-[50]' size={20}/></button>
                }
            </>
            }

            {type === "dm" && <div className="w-[200px] text-[#949Ba4] text-[13px] font-bold p-[10px] pt-[15px] cursor-default mb-[10px] border-b-[1.5px] border-b-solid border-b-[#131313] scale-y-[0.96] hover:text-white">DIRECT MESSAGES</div>}

            {/* this modal is not working */}
            {/* <Navlinks pathname={pathname} name={<FaPlus size={25} />} type="CreateChannelModal" href="" color="#23A559" /> */}
            {type === "server" &&
                <div className="w-[200px] text-[#949Ba4] text-[13px] flex justify-between items-center font-bold p-[10px] pt-[15px] mb-[10px] border-b-[1.5px] border-b-solid border-b-[#131313] scale-y-[0.96] hover:text-white select-none cursor-pointer" onClick={()=>{serverOwner === session.user.name && setChannelModal("open")}}>
                    TEXT CHANNELS {serverOwner === session.user.name ? <FaPlus /> : null}
                </div>
            }
            {
                channelModal === "open" && <CreateModal setmodal={setChannelModal} type="channel" serverName={serverSlug} />
            }


            {/* friends list for the dms page */}
            {
            type === "dm" &&
            friends.map((friend, index)=>{
                return <DmFriend key={index} name={friend.name} link={`/friends/dm/${friend.name}`}/>
            })
            }


            {/* server channels for the server page */}
            {
                type === "server" && 
                channels.map((channel, index)=>{
                    return <Channel key={index} name={channel.channelName}/>
                })
            }

            <div className="w-full h-[52px] bg-[#232428] absolute bottom-0 flex justify-between items-center text-[#f2f3f5]">
            <Tooltip id="my-tooltip" />
                <div className="flex items-center transition-all duration-[0.2s] p-[5px] rounded-[5px] ml-[10px] w-[150px] hover:bg-[#3c3e44]" data-tooltip-id="my-tooltip" data-tooltip-content={session.user.name} data-tooltip-place="top">
                    <div className="w-[32px] h-[32px] rounded-[50%] overflow-hidden ml-[10px]">
                        <img
                            alt='pfp'
                            className='w-[32px]'
                            src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
                        />
                    </div>
                    <p className='ml-[10px] w-[100px] truncate' >
                        {session.user.name}
                    </p>
                </div>
                <IoIosLogOut onClick={()=>{signOut()}} size={42} className='text-[red] p-[10px] mr-[20px] rounded-[5px] hover:bg-[#3c3e44]' data-tooltip-id="my-tooltip" data-tooltip-content="Log Out" data-tooltip-place="top"/>
            </div>
        </div>
    )
}

export default SideNav2
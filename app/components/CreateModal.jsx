import React, {useState, useRef, useContext} from 'react'
import { RxCross1 } from "react-icons/rx";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { serverContext } from '../context/serverContext';

const CreateModal = ({ setmodal, type, serverName }) => {
    const {data: session} = useSession();

    const {serverUpdate, setServerUpdate} = useContext(serverContext)


    const [inputVal, setinputVal] = useState(null);
    const ref = useRef("")


    // handle submit function for the creation of a server
    const handleServerSubmit = async ()=>{
        // this is the input value, logged when the submit button is clicked
        let inputVal = ref.current.value
        console.log(inputVal)

        // make POST request on create server to add the server in the user's server list
        const response = await fetch(`/api/server?current=${session.user.name}&serverName=${inputVal}`, {method: 'POST'});
        const data = await response.json();
        console.log(data);
        setmodal('close');
        setServerUpdate("Please update")
    }

    // TODO: handle submit for the creation of a channel inside a particular server
    const handleChannelSubmit = async ()=>{
        let inputVal = ref.current.value;

        const response = await fetch(`/api/channels?server=${serverName}&channelName=${inputVal}`, {method: 'POST'});
        const data = await response.json();
        console.log(data)
        setmodal('close');
        // update the list of channels after creating one
    }

    return (
        <div className={`w-[100vw] h-[100vh] absolute ${type === "channel" ? "left-[-72px]" : "left-0"} top-0 bg-[#00000092] flex justify-center items-center z-50`} >
            <div className='w-[23%] h-[58%] rounded-[10px] bg-[#313338] flex flex-col items-center'>
                <div className='w-full h-[50px] flex items-center justify-end text-white cursor-pointer' onClick={()=>{setmodal("close")}}>
                    <RxCross1 size={24} className='mr-[20px]'/>
                </div>
                <h1 className='text-[#f2f3f5] font-bold text-[20px] mt-[20px]'>
                    {type === "server" && "Vikhyatz, Create Your Server"}
                    {type === "channel" && `Create Channel in ${serverName}`}
                </h1>
                <p className='text-[#b5bac1] text-center w-[90%] mt-[10px]'>
                {type === "server" && "Give your new server a personality with new name. You can never change it later"}
                {type === "channel" && "Give your server a new channel name. You can never change it later"}
                </p>
                <p className='text-[#b5bac1] font-bold w-full text-left ml-[40px] mt-[50px]'>
                    {type === "server" && "SERVER NAME"}
                    {type === "channel" && "CHANNEL NAME"}
                </p>
                    <input className='h-[40px] w-[95%] outline-0 border-0 bg-[#1E1F22] rounded-[5px] p-[10px] text-[white] text-[16px]' type="text" ref={ref} placeholder={type === "server" ? "Your server's name" : "# new-channel"}/>

                    <p className='text-[#949BA4] w-full text-center mt-[50px] text-[14px]'>
                        {type === "server" && <>By creating a server, you agree to Discord clone&apos;s <Link href='/guidlines' className='underline text-[#008afc]'>Community Guidelines</Link></>}
                        {type === "channel" && <>By creating a channel, you agree to Discord clone&apos;s <Link href='/guidlines' className='underline text-[#008afc]'>Community Guidelines</Link></>}
                        </p>

                    <button onClick={type === 'channel' ? handleChannelSubmit : handleServerSubmit} className='p-[10px] bg-[#5865F2] text-[#ffff] outline-0 border-0 rounded-[5px] mt-[15px] transition-all duration-[0.2s] cursor-pointer'>
                        {type === "server" && "Create Server"}
                        {type === "channel" && "Create Channel"}
                    </button>
            </div>
        </div>
    )
}

export default CreateModal
"use client"
import React, { useEffect, useState, useRef } from 'react'
import { usePathname, redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

// TODO:
// time
// date
// profile picture
// friends don't update after accepting the request

import { socket } from "@/app/socket";

import SideNav1 from '../../../components/SideNav1';
import SideNav2 from '../../../components/SideNav2';

const Page = () => {
  const params = useParams()
  const pathname = usePathname()
  const { data: session } = useSession()
  if(!session){
    redirect('/')
  }

  
  
  // TODO: CHECK IF THE FRIEND IS VALID OR NOT AND UPDATE THE NECESSAGEY NAMES THROUGH THE SLUG
  // const [friends, setFriends] = useState(null);
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState(0);
  const [audio] = useState(new Audio("/notification.mp3"));
  // dynamic slug
  const slug = params.slug
  console.log(params)
  
  // SOCKET IO
  const ref = useRef();
  const messagecontainer = useRef();

  // first use effect for the user to connect to the private room name
  // socket.emit("")


  useEffect(() => {
    // fetch the roomname created at the server side
    console.log("here")
    const fetchRoomName = async ()=>{
      const response = await fetch(`/api/individualChat?current=${session.user.name}&friend=${slug}`)
      const data = await response.json();
      console.log("this should be the room name: ", data.roomName)

      // connect the user with the generated roomname
      socket.emit('joinRoom', data.roomName);
      setRoomName(data.roomName)
    }
    fetchRoomName()
    console.log(roomName)
  }, [])


  useEffect(() => {
    // Check if socket is already connected
    if (!socket.connected) {
      socket.connect();  // Ensure the socket connects
    }

    // Listen for messages from the server
    const handleMessage = (message, sender, date, time) => {
      setMessages((prevMessages) => [...prevMessages, {sender: sender, message: message, date: date, time: time}]);

      // basically just plays the notification sound for those who did not send the message, a little different approach maybe. just checks the name with the session name and if it is not equal, plays the sound..
      if (sender != session.user.name){
        audio.play();
      }
    };
    
    // Subscribe to the 'chat message' event
    socket.on('receive messsage', handleMessage);
    
    // Cleanup: Unsubscribe from the event on component unmount
    return () => {
      socket.off('receive messsage', handleMessage);
    };
  }, []);

  const numberPadding = (num)=>{
    if (num < 10){
      return `0${num}`;
    }else{
      return num
    }
  }
  
  const handleClick = (e)=>{
    e.preventDefault();
    const inpVal = ref.current.value;
    // compute date, time here and then pass below  
    const date = new Date();
    const finalDate = `${numberPadding(date.getDate())}/${numberPadding(date.getMonth()+1)}/${numberPadding(date.getFullYear())}`;
    
    const time = `${numberPadding(date.getHours())}:${numberPadding(date.getMinutes())}`;
    socket.emit("chat message", inpVal, roomName, session.user.name, finalDate, time);
    console.log(inpVal)
    console.log(messages)
    ref.current.value = ''
    
  }
  
  useEffect(() => {
    if (messagecontainer.current) {
      messagecontainer.current.scrollTop = messagecontainer.current.scrollHeight;
    }
  }, [messages]);
  
  

  return (
    <>
      <div className='w-full h-[100vh] flex bg-[#313338] overflow-hidden'>
        <SideNav1 pathname={pathname} />
        <SideNav2 pathname={pathname} type="dm"/>

        <main className="relative w-[calc(100%-312px)]">
          <div className="flex items-center w-full h-11 bg-[#313338] border-b-[1.5px] border-[#131313] text-white font-semibold text-base">
            <div className="w-6 h-6 ml-[20px]">
              <img
                src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
                alt="pfp"
                className="rounded-full"
              />
            </div>
            <p className="ml-2">{slug}</p>
            <div className="w-1.5 h-1.5 ml-2 bg-gray-500 rounded-full"></div>
            <p className="ml-4 text-[13px] text-[#808080] font-semibold">{slug}</p>
          </div>

          <div ref={messagecontainer} className="absolute bottom-[75px] w-full max-h-[81%] overflow-auto">

                {messages.map((message, index) => {

                  return (
                  <div className="flex items-center mb-2 ml-5 mt-[20px]" key={index} >
                    <div className="w-10 h-10">
                      <img
                        src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
                        alt="pfp"
                        className="rounded-full"
                      />
                    </div>

                    <div className="ml-4">
                      <div className="flex items-baseline">
                        <p className="text-[#f2f3f5] font-semibold">{message.sender}</p>
                        <p className="ml-4 text-[13px] text-[#808080] font-semibold scale-y-95">
                          {/* 23/09/2023 {message.time} */}
                          {message.date} {message.time}
                        </p>
                      </div>
                      <div className="text-[#dbdee1]">{message.message}</div>
                    </div>
                  </div>
                  )

                })}

            {/* <div className="flex items-center mb-2 ml-5">
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
            </div> */}
          </div>

          <form onSubmit={handleClick} className="absolute bottom-5 left-5 flex items-center bg-[#383A40] rounded-lg w-[94%] h-11">
            <input
              type="text"
              name="message"
              placeholder={`Message @${slug}`}
              autoComplete="off"
              ref={ref}
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


      </div >
      {/* <audio id='yo'>
        <source src='notification.mp3'/>
      </audio> */}
    </>
  )
}

export default Page
"use client"
import React, { useEffect, useState, useRef } from 'react'
import { usePathname, redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

// socket
import { socket } from "@/app/socket";

import SideNav1 from '../../../components/SideNav1';
import SideNav2 from '../../../components/SideNav2';
import Link from 'next/link';
import Loading from '@/app/components/Loading';
import Error from '@/app/components/Error';

const Page = () => {
  const params = useParams()
  const pathname = usePathname()
  const { data: session, status } = useSession()


  const [messages, setMessages] = useState([]);
  const [serverMessages, setServerMessage] = useState()

  const [roomName, setRoomName] = useState(0);
  const [validFriend, setValidFriend] = useState(0);
  const [error, setError] = useState(null);


  const [audio] = useState(new Audio("/notification.mp3"));
  // dynamic slug
  const slug = decodeURIComponent(params.slug)

  // SOCKET IO
  const ref = useRef();
  const messagecontainer = useRef();

  // check if both users are friends or not
  useEffect(() => {
    const checkFriends = async () => {
      const response = await fetch(`/api/checkUserAndFriends?user=${session.user.name}&friend=${slug}`)
      setValidFriend(response.status)
    }
    if (status === "authenticated") {
      checkFriends()
    }
  }, [status, session])



  // first use effect for the user to connect to the private room name
  useEffect(() => {
    // fetch the roomname created at the server side
    const fetchRoomName = async () => {

      const response = await fetch(`/api/individualChat?current=${session.user.name}&friend=${slug}`)
      if (response.ok) {
        const data = await response.json();

        // connect the user with the generated roomname
        socket.emit('joinRoom', data.roomName);
        setRoomName(data.roomName)

      }
    }
    if (status === "authenticated" && validFriend != 404) {
      fetchRoomName()
    }
  }, [status, session, validFriend])


  // load the previous messages, as the users have connected to the room by now
  const fetchMessages = async (roomName) => {
    const response = await fetch(`/api/fetchMessages?roomName=${roomName}`)
    const data = await response.json()
    console.log(data)
    if(data.allMessages == null){
      setServerMessage(null)
    }else{
      setServerMessage(data.allMessages.messages)
    }
  }

  useEffect(() => {
    if(roomName != 0){
      fetchMessages(roomName)
    }
  }, [roomName])
  




  useEffect(() => {
    // Check if socket is already connected
    if (!socket.connected) {
      socket.connect();  // Ensure the socket connects
    }

    // Listen for messages from the server
    const handleMessage = (message, sender, date, time) => {
      setMessages((prevMessages) => [...prevMessages, { sender: sender, message: message, date: date, time: time }]);

      // basically just plays the notification sound for those who did not send the message, a little different approach maybe. just checks the name with the session name and if it is not equal, plays the sound..
      if (sender != session.user.name) {
        audio.play();
      }
    };


    



    // Subscribe to the 'chat message' event
    if (status === "authenticated") {
      socket.on('receive messsage', handleMessage);
    }
    // Cleanup: Unsubscribe from the event on component unmount
    return () => {
      socket.off('receive messsage', handleMessage);
    };
  }, [session, status]);

  const numberPadding = (num) => {
    if (num < 10) {
      return `0${num}`;
    } else {
      return num
    }
  }


  const handleClick = (e) => {
    e.preventDefault();
    const inpVal = ref.current.value;
    // compute date, time here and then pass below
    const date = new Date();
    const finalDate = `${numberPadding(date.getDate())}/${numberPadding(date.getMonth() + 1)}/${numberPadding(date.getFullYear())}`;

    const time = `${numberPadding(date.getHours())}:${numberPadding(date.getMinutes())}`;

    if (inpVal.trim() != "") {
      socket.emit("chat message", inpVal, roomName, session.user.name, finalDate, time);

      // save the message in the database as well as emitting the message
      const saveMessageDb = async () => {
        const response = await fetch(`/api/saveMessageDb?roomName=${roomName}&sender=${session.user.name}&date=${finalDate}&time=${time}&content=${inpVal}`, {method: "POST"})
      }
      saveMessageDb()
    }
    ref.current.value = ''

  }

  useEffect(() => {
    if (messagecontainer.current) {
      messagecontainer.current.scrollTop = messagecontainer.current.scrollHeight;
    }
  }, [messages]);

  if (status === "loading") return <Loading/>;
  if (status === "unauthenticated") return <Error text="You should probably go authenticate" />
  if (validFriend === 403) return <Error text="You cannot access this chat, you are not friends, please go back to home" />
  if (validFriend === 404) return <Error text="User does not exist, please go back to home" />



  return (
    <>
      <div className='w-full h-[100vh] flex bg-[#1c1f26] overflow-hidden'>
        <SideNav1 pathname={pathname} />
        <SideNav2 pathname={pathname} type="dm" />

        <main className="relative w-[calc(100%-332px-40px)] h-[calc(100vh-30px)] ml-[10px] mt-[15px] rounded-[20px] bg-[#16181d]">
          <div className="flex items-center w-full h-11 text-white font-semibold text-base">
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

          <div ref={messagecontainer} className="absolute bottom-[75px] w-[calc(100%-10px)] max-h-[calc(100vh-150px)] overflow-auto">
            {/* first load the previous messages taken from the server */}
            {serverMessages == null ? <p className="w-full text-white text-center">No Messages Yet</p> : (serverMessages == undefined ? <p className="w-full text-white text-center">Loading your messages...</p> : serverMessages.map((message, index) => {
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
                      <p className="text-[#f2f3f5] font-semibold">{message.senderName}</p>
                      <p className="ml-4 text-[13px] text-[#808080] font-semibold scale-y-95">
                        {message.date} {message.time}
                      </p>
                    </div>
                    <div className="text-[#dbdee1]">{message.content}</div>
                  </div>
                </div>
              )
            }))}

            {/* then load the messages from the client state [messages] */}
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
          </div>

          <form onSubmit={handleClick} className="absolute bottom-5 left-5 flex items-center bg-[#1c1f26] rounded-lg h-11 w-[calc(100%-40px)]">
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
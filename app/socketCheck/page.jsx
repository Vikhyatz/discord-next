"use client";

import { useEffect, useState, useRef } from "react";
import { socket } from "../socket";


export default function Home() {

  const [messages, setMessages] = useState(["first message init"]);
  const ref = useRef();


  useEffect(() => {
    const handleHelloMessage = (value) => {
      setMessages((prevValue) => [...prevValue, value]);
    };

    socket.on("receive message", handleHelloMessage);

    return () => {
      socket.off("receive message", handleHelloMessage);
    };
  }, []);
  

  const handleClick = (e)=>{
    e.preventDefault();
    const inpVal = ref.current.value;
    console.log(inpVal)
    socket.emit("send message", inpVal);
    console.log(messages)
  }
  

  return (
    <div>
      {/* <p>Status: { isConnected ? "connected" : "disconnected" }</p> */}
      {/* <p>Transport: { transport }</p> */}
      <input type="text" ref={ref} className="w-[70%] p-[20px] border-[2px] border-solid border-black"/>
      <button onClick={handleClick} className="m-[10px] p-[10px] rounded-[5px] bg-[black] text-white">click to send a hello message to the server socket</button>
      {messages.map((message, index)=>{
        return <li key={index} >{message}</li>
      })}
    </div>
  );
}
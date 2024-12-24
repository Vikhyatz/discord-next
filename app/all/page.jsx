"use client"
import React, { useEffect, useState } from 'react'

const page = () => {
    // const [all, setAll] = useState()
    // const [buttonState, setButton] = useState(0);



    useEffect(() => {
      const getAll = async ()=>{
        const response = await fetch("/api/all");
        const data = await response.json();
        // setAll(data)
        console.log(data)
        // setButton(1);
      }
      getAll();
    }, [])
    // const handleClick = async ()=>{
    //   const response = await fetch("/api/all");
    //   const data = await response.json();
    //   setAll(data)
    //   console.log(data)
    //   setButton(1);
    // }
    
    
  return (
    <>
    {/* <button onClick={handleClick}>checkall</button> */}
    check console
    </>
  )
}

export default page
"use client"
import React, { useEffect, useState } from 'react'

const Page = () => {
    useEffect(() => {
      const getAll = async ()=>{
        const response = await fetch("/api/all");
        const data = await response.json();
        console.log(data)
      }
      getAll();
    }, [])
    
    
  return (
    <>check console
    </>
  )
}

export default Page
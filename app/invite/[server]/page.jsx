"use client"
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'


const page = () => {
    const {date : session, status} = useSession()
    if(status === "loading"){
        return <p>loading..</p>
    }
    if(status === "unauthenticated"){
        return <p>you should probably go an authenticate</p>
    }
    // console.log()
    // useEffect(() => {
      
    // }, [])
    console.log(session)
    
    return (
        <div>{session.user.name}</div>
    )
}

export default page
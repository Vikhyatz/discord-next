"use client"
import React, { useEffect, useState } from 'react'
import Friend from './Friend'
import { useSession } from 'next-auth/react'
import RequestModal from './RequestModal'

const Requests = () => {
    const {data : session} = useSession();
    const [requests, setRequests] = useState(null)

    
    const [modal, setModal] = useState("close")
    

    const fetchRequests = async ()=>{
        const response = await fetch(`api/requests?id=${session.user.name}`);
        const data = await response.json();
        console.log(data)
        setRequests(data.requests)
    }
    useEffect(() => {
        fetchRequests()
    }, [])

    if (!Array.isArray(requests)) {
        return <div className='text-[#b8babe] m-[30px]'>Loading...</div>;
    }
    const pendingCount = requests.length;
    
    
    return (
        <>
            <div className='w-full flex justify-center items-center text-[#b8babe]'>
                <div className="w-[90%] h-fit">

                    <p className='my-[30px]'>
                        {(pendingCount > 0) ? `PENDING - ${pendingCount}` : "No Pending Requests"}
                    </p>

                    {!requests && "Loading..."}
                    {requests.map((profile, index)=>{
                            return <Friend type="request" key={index} src="https://res.cloudinary.com/anyanime/image/upload/5eff0d8049bbdf8df8dc0762c4f526c0Kurizu39.png" setModal={setModal} onUpdate={fetchRequests} name={profile.name} /> 
                    })}
                </div>
            </div>
            
            {modal === "openAccept" && <RequestModal setmodal={setModal} type="accept" />}
            {modal === "openReject" && <RequestModal setmodal={setModal} type="reject" />}
        </>
    )
}

export default Requests
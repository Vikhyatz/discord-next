import React, { useEffect, useState } from 'react'
import Friend from './Friend'
import { useSession } from 'next-auth/react'

const Allfriends = () => {
    const { data: session } = useSession();
    const [friends, setFriends] = useState(null)

    const [modal, setModal] = useState("close")


    const handleFriends = async () => {
        const response = await fetch(`api/friends?current=${session.user.name}`)
        const dat = await response.json();
        setFriends(dat.user.friends)
        console.log(dat.user.friends)
    }
    useEffect(() => {
        handleFriends()
    }, [])

    if (!Array.isArray(friends)) {
        return <div className='text-[#b8babe] m-[30px]'>Loading...</div>;
    }
    const totalFriends = friends.length

    return (
        <>
            <div className='w-full flex justify-center items-center text-[#a0a3a8]'>
                <div className="w-[90%] h-fit">

                    <p className='my-[30px]'>ALL FRIENDS - {totalFriends}</p>

                    {/* friends list */}
                    {friends.map((friend, index) => {
                        return (
                            <Friend type="all" key={index} name={friend.name} src="https://res.cloudinary.com/anyanime/image/upload/5eff0d8049bbdf8df8dc0762c4f526c0Kurizu39.png" onUpdate={handleFriends} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Allfriends
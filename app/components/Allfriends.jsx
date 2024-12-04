import React from 'react'
import Friend from './Friend'

const Allfriends = () => {
    return (
        <>
            <div className='w-full flex justify-center items-center text-[#a0a3a8]'>
                <div className="w-[90%] h-fit">

                    <p className='my-[30px]'>ALL FRIENDS - 4</p>

                    {/* friends list */}
                    <Friend type="all"  src="https://res.cloudinary.com/anyanime/image/upload/5eff0d8049bbdf8df8dc0762c4f526c0Kurizu39.png" name="vikhyat"/>
                    <Friend type="all"  src="https://res.cloudinary.com/anyanime/image/upload/5eff0d8049bbdf8df8dc0762c4f526c0Kurizu39.png" name="vikhyat"/>
                    <Friend type="all"  src="https://res.cloudinary.com/anyanime/image/upload/5eff0d8049bbdf8df8dc0762c4f526c0Kurizu39.png" name="vikhyat"/>
                    <Friend type="all"  src="https://res.cloudinary.com/anyanime/image/upload/5eff0d8049bbdf8df8dc0762c4f526c0Kurizu39.png" name="vikhyat"/>
                    
                    
                </div>
            </div>
        </>
    )
}

export default Allfriends
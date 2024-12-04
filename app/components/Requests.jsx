import React from 'react'
import Friend from './Friend'

const Requests = () => {
    return (
        <>
            <div className='w-full flex justify-center items-center text-[#b8babe]'>
                <div className="w-[90%] h-fit">

                    <p className='my-[30px]'>PENDING - 4</p>

                    {/* friends list */}
                    <Friend type="request"  src="https://res.cloudinary.com/anyanime/image/upload/5eff0d8049bbdf8df8dc0762c4f526c0Kurizu39.png" name="vikhyat"/>
                    <Friend type="request"  src="https://res.cloudinary.com/anyanime/image/upload/5eff0d8049bbdf8df8dc0762c4f526c0Kurizu39.png" name="vikhyat"/>
                    <Friend type="request"  src="https://res.cloudinary.com/anyanime/image/upload/5eff0d8049bbdf8df8dc0762c4f526c0Kurizu39.png" name="vikhyat"/>
                    <Friend type="request"  src="https://res.cloudinary.com/anyanime/image/upload/5eff0d8049bbdf8df8dc0762c4f526c0Kurizu39.png" name="vikhyat"/>
                    
                    
                </div>
            </div>
        </>
    )
}

export default Requests
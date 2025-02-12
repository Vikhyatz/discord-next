import React from 'react'
import Link from 'next/link'

const DmFriend = ({name, link}) => {
    return (
        <>
        {/* TODO: write the code to assign the classes when the pathname is set to this friends direct message */}
            <Link href={link} className="w-[224px] h-[42px] flex items-center text-[#949Ba4] rounded-[2px] my-[2px] transition-all duration-[100ms] hover:bg-[#35383e4f] hover:text-white cursor-pointer hover:rounded-[15px]">
                <div className="w-[32px] h-[32px] rounded-full overflow-hidden ml-[10px]">
                    <img className='w-[32px]' src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg" alt="pfp" />
                    {/* <img className='w-[32px]' src="https://lh3.googleusercontent.com/a/ACg8ocIq7XP0AmaIg7Rj3jj_ceN2hGKqpClp_SI-iqSiBu6USpDFh5Hl=s96-c" alt="pfp" /> */}
                </div>
                <p className='ml-[10px]'>
                    {name}
                </p>
            </Link>
        </>
    )
}

export default DmFriend
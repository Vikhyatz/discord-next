import React from 'react'
import Link from 'next/link'

const Channel = ({name, link}) => {
    return (
        <Link href={link} className="w-[224px] h-[42px] flex items-center text-[#949Ba4] rounded-[15px] my-[2px] transition-all duration-[100ms] hover:bg-[#35383e4f] hover:text-white cursor-pointer font-semibold">
            <p className='ml-[15px]'>#</p>
            <p className='ml-[10px]'>
                {name}
            </p>
        </Link>
    )
}

export default Channel
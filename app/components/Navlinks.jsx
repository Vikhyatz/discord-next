import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

const Navlinks = ({href, pathname, name, color}) => {
  return (
    <Link
        href={href}
        className={clsx(
            `transition-all duration-300 ease-in-out w-[48px] h-[48px] bg-[#313338] rounded-[50%] flex justify-center items-center mt-[10px] text-[#DBDEE1] font-bold text-15px hover:bg-[${color}] hover:rounded-[10px]`,
            pathname === href && `bg-[${color}] rounded-[10px]`
        )}
        >{name}
        </Link>
  )
}

export default Navlinks
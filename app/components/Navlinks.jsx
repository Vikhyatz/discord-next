import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import CreateModal from './CreateModal'

const Navlinks = ({href, pathname, name, color, type}) => {
  const [modal, setmodal] = useState("close")
  
  
  return (
    <>
      <Link onClick={()=>{setmodal("open")}}
          href={href}
          className={clsx(
              `transition-all duration-300 ease-in-out w-[48px] h-[48px] bg-[#313338] rounded-[50%] flex justify-center items-center mt-[10px] text-[#DBDEE1] font-bold text-15px hover:bg-[${color}] hover:rounded-[10px]`,
              type == "CreateServerModal" && modal === "open" && `bg-[${color}] rounded-[11px]`
          )}
          >{name}
          </Link>

          {
            type == "CreateServerModal" && modal === "open" && <CreateModal setmodal={setmodal} type="server" />
          }
    </>
  )
}

export default Navlinks
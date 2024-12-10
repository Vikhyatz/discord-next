import React from 'react'
import Navlinks from './Navlinks'

// icons
import { FaDiscord, FaGithub } from "react-icons/fa";
import { FaPlus} from "react-icons/fa6"

const SideNav1 = ({pathname}) => {
    return (
        <nav className='bg-[#1E1F22] w-[72px] h-[100vh] flex items-center flex-col'>

            <Navlinks pathname={pathname} name={<FaDiscord size={25} />} href="/friends" color="#5865F2" />

            <div className="w-[30px] h-[2px] bg-[#34363B] mt-[10px]"></div>

            {/* server list */}
            <Navlinks pathname={pathname} name="vs" href="/server" color="#5865F2" />
            <Navlinks pathname={pathname} name="ops" href="/server" color="#5865F2" />
            <Navlinks pathname={pathname} name="rs" href="/server" color="#5865F2" />

            <Navlinks pathname={pathname} name={<FaPlus size={25} />} type="CreateServerModal" href="" color="#23A559" />

            <div className="w-[30px] h-[2px] bg-[#34363B] mt-[10px]"></div>

            <Navlinks pathname={pathname} name={<FaGithub size={25} />} href="https://github.com/Vikhyatz" color="#23A559" />
        </nav>
    )
}

export default SideNav1
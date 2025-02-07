import React, { useEffect , useState, useContext } from 'react'
import Navlinks from './Navlinks'
import { useSession } from 'next-auth/react';
// import { memo } from 'react';

// icons
import { FaDiscord, FaGithub } from "react-icons/fa";
import { FaPlus} from "react-icons/fa6"
import { serverContext } from '../context/serverContext';

const SideNav1 = ({pathname}) => {
    const {data : session} = useSession();
    const [serversList, setServerList] = useState(null)
    // const [serverCreateTracker, setServerCreateTracker] = useState(null);

    const {serverUpdate, setServerUpdate} = useContext(serverContext)
    
    useEffect(() => {
      const fetchServers = async ()=>{
        const response = await fetch(`/api/server?current=${session.user.name}`);
        const data = await response.json();
        setServerList(data.joinedServers)
        // console.log("here" , data.joinedServers)
      }
      fetchServers();
    }, [serverUpdate])

    console.log("this is the server list ", serversList)
    


    return (
        <nav className='bg-[#1E1F22] w-[72px] h-[100vh] flex items-center flex-col'>

            <Navlinks pathname={pathname} name={<FaDiscord size={25} />} href="/friends" color="#5865F2" />

            <div className="w-[30px] h-[2px] bg-[#34363B] mt-[10px]"></div>

            {/* server list */}
            {/* DISPLAY THE SERVERS HERE */}
            {
                !Array.isArray(serversList) ? "Loading..." :
                    serversList.map((server, index)=>{
                    // return <Navlinks pathname={pathname} key={index} name={server.serverIcon} tracker={setServerCreateTracker}  href={`/${server.serverName}`} color="#5865F2" />
                    return <Navlinks pathname={pathname} key={index} name={server.serverIcon}  href={`/server/${server.serverName}`} color="#5865F2" />

                })
            }
            
            {/* <Navlinks pathname={pathname} name="ops" href="/server" color="#5865F2" />
            <Navlinks pathname={pathname} name="rs" href="/server" color="#5865F2" /> */}

            <Navlinks pathname={pathname} name={<FaPlus size={25} />} type="CreateServerModal" href="" color="#23A559" />

            <div className="w-[30px] h-[2px] bg-[#34363B] mt-[10px]"></div>

            <Navlinks pathname={pathname} name={<FaGithub size={25} />} href="https://github.com/Vikhyatz" color="#23A559" />
        </nav>
    )
}

export default SideNav1
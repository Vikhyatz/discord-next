import React ,{ useRef, useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';


const Addfriend = () => {
  const {data : session } = useSession();

  const inpRef = useRef(null);
  const [inp, setinp] = useState("")
  const [renderH3 , setRender] = useState("hidden")
  const [textH3, setText] = useState("Loading....")

  const [selected, setSelected] = useState('');

  const handleQuery = async (e)=>{

    e.preventDefault();
    setRender(""); // otherwise hidden
    
    const inpVal = inp;
    const response = await fetch(`/api/addFriend?query=${inp}&current=${session.user.name}`);
    const data = await response.json();
    console.log(data);
    if(data.message){ 
      setText(data.message)
      console.log(data);
      console.log("wrong username, try again")
    }
    else{
      setText("Request Sent!!")
      console.log("sent request")
      console.log(data);
    }
  }
  
  const checkInput = () => {
    setinp(inpRef.current.value)
  }

  return (
    <>
    <main className='relative w-full'>
        <div className="w-[90%] h-fit flex flex-col justify-center text-left g-[20px] mt-[20px] ml-[20px]">
            <h3 className='text-[f2f3f5] font-bold text-white'>ADD FRIEND</h3>
            <p className='text-[#b5bac1] mt-[10px]'>You can add friends with their Discord usernames.</p>

            <form className="w-[80%] mt-[20px] h-[50px] bg-[#1E1F22] flex justify-around items-center rounded-[8px] border-[1px] transition-all duration-100 border-transparent focus-within:border-[#00AAFC]" onSubmit={handleQuery} method="post">

                <input ref={inpRef} onInput={checkInput} className='h-[40px] w-[77%] p-[10px] font-[17px] bg-transparent border-0 outline-0 text-white' type="text" name="friendName"
                    placeholder="You can add friends with their Discord usernames" />
                  
                <button className='h-[30px] w-[20%] bg-[#5865F2] text-white  border-0 outline-0 rounded-[3px] disabled:cursor-not-allowed disabled:bg-[#3B418A] disabled:text-[grey] disabled:border-0 disabled:outline-0' disabled={inp === "" ? true : false} type="submit">Send Friend Request</button>
            </form>
            <h3 className={`${renderH3} text-xl m-[20px] ${textH3 === "Request Sent!!" ? "text-[#1ac41a]" : "text-[#ff0000]"}`} >{textH3}</h3>
        </div>
    </main>
    

    </>
  )
}

export default Addfriend
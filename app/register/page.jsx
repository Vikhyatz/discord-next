import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <>
       <div className="flex justify-center items-center w-full h-[100vh] overflow-hidden bg-[#313338] flex-col">

        <div className="w-[80%] max-w-[550px] justify-center items-center flex-col flex p-[5%] text-center sm:w-[90%] sm:p-[5%]">
            <p className="w-full text-white text-[30px] font-bold mb-[15px]">Register to Discord</p>

            <form className="flex items-center justify-center flex-col w-full gap-[10px]" action="/register" method="post">
                <input type="email" name="email" placeholder="Enter your email or phone" className="w-full h-[50px] rounded-[5px] border border-solid border-[rgb(48, 45, 45)] bg-[#1E1F22] p-[10px] text-white transition duration-500 border-0 focus:border focus:border-[#5865F2] focus:placeholder:text-[#5865F2] focus:border-solid outline-0" required
                     />

                <input type="username" id="username" name="username" placeholder="Enter your username"
                    className="w-full h-[50px] rounded-[5px] border border-solid border-[rgb(48, 45, 45)] bg-[#1E1F22] p-[10px] text-white transition duration-500 border-0 focus:border focus:border-[#5865F2] focus:placeholder:text-[#5865F2] focus:border-solid outline-0" required  />
                <p className='hidden'></p>

                <input type="password" name="password" placeholder="Enter your password" className="w-full h-[50px] rounded-[5px] border border-solid border-[rgb(48, 45, 45)] bg-[#1E1F22] p-[10px] text-white transition duration-500 border-0 focus:border focus:border-[#5865F2] focus:placeholder:text-[#5865F2] focus:border-solid outline-0"
                    required />

                <button className="w-full p-[10px] rounded-[5px] cursor-pointer transition duration-[300ms] mt-[20px] bg-[#5865F2] outline-0 border-0 text-white hover:opacity-[0.7]" type="submit">Log in</button>
            </form>
            <div className="flex justify-start w-full mt-[15px] text-[#949ba4] text-[13px] bg-[rgba(255, 0, 0, 0)]">
                <p>have an account already?&nbsp;</p>
                <Link href="/" className="text-[#00a8fc] hover:underline hover:decoration-solid"> login </Link>
            </div>
        </div>
       </div>
       </>
  )
}

export default page
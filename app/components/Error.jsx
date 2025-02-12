import React from 'react'

const Error = ({text}) => {
  return (
    <div className='flex justify-center items-center w-full h-screen overflow-hidden bg-[#1C1F26]'>
        <h1 className='text-white text-[35px]'>{text}</h1>
    </div>
  )
}

export default Error
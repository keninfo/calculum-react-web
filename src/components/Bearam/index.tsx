import React from 'react'

import Image from 'next/image'

import Navbar from './Navbar'

const index = () => {
  return (
    <div className="h-screen w-screen bg-[#5622AA]">
      <div className="relative z-50">
        <Navbar />
      </div>
      <Image
        src="/bearambg.png"
        alt=""
        className="pointer-events-none absolute -top-1 right-0 z-10 w-screen bg-cover mix-blend-multiply"
        style={{ height: `calc(100vh + ${4}px)` }}
        width="1000"
        height="1000"
      />
    </div>
  )
}

export default index

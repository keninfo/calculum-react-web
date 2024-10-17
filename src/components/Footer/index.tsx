import React from 'react'

import Image from 'next/image'

// import Logo from '@/components/common/Icons/Logo'

const index = () => {
  return (
    <footer className="| mx-[0.5vw] hidden h-[20vh] items-center justify-evenly rounded-lg bg-darkness md:flex">
      <div className="flex items-center justify-center space-x-2 text-greySmoke">
        <p>LinkedIn</p>
        <p>|</p>
        <p>Github</p>
      </div>
      <Image src="/bearLogo2.png" width={200} height={100} alt="Picture of the author" />
      <p className="text-greySmoke">Smoothcoin @ 2024. All Rights Reserved</p>
    </footer>
  )
}

export default index

import React from 'react'

import Image from 'next/image'

const index = () => {
  return (
    <footer className="mt-10 h-fit items-center rounded-lg bg-dark px-10 py-6 md:mb-0 md:mt-0 md:grid md:grid-cols-3">
      <div className="col-span-1 flex items-center justify-center space-x-5 text-white md:justify-start">
        <a href="https://t.me/+MOdhyvB63StmMmE0" target="_blank">
          <Image src="/telegram-white.png" width={50} height={100} alt="image" className="h-6 w-6" />
        </a>

        <p>|</p>
        <a href="https://x.com/HODLlikeaPro" target="_blank">
          <Image src="/x.png" width={50} height={100} alt="image" className="h-5 w-5" />
        </a>
      </div>
      <div className="col-span-1 my-5 flex h-full w-auto items-center justify-center px-20 md:my-0">
        <Image src="/HODL.png" width={500} height={1000} alt="image" className="h-10 w-auto" />
      </div>

      <p className="col-span-1 text-center text-grey md:text-right">HODL Protocol @ 2025. All Rights Reserved</p>
    </footer>
  )
}

export default index

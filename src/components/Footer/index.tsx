import React from 'react'

import Image from 'next/image'

const index = () => {
  return (
    <footer className="mt-10 flex h-fit flex-col items-center rounded-lg bg-dark px-10 py-6 md:mb-0 md:mt-0 md:grid md:grid-cols-3">
      <div className="order-2 col-span-1 flex items-center justify-center space-x-5 text-white md:order-1 md:justify-start">
        <a href="https://t.me/+MOdhyvB63StmMmE0" target="_blank">
          <Image src="/telegram-white.png" width={50} height={100} alt="image" className="h-6 w-6" />
        </a>

        <p>|</p>
        <a href="https://x.com/HODL_Protocol " target="_blank">
          <Image src="/x.png" width={50} height={100} alt="image" className="h-5 w-5" />
        </a>
      </div>
      <div className="order-1 col-span-1 my-5 flex h-full w-auto items-center justify-center px-20 md:order-2 md:my-0">
        <Image
          src="/logo/main_logo.svg"
          width={500}
          height={1000}
          alt="image"
          className="h-auto w-full md:h-10 md:w-auto"
        />
      </div>

      <p className="order-3 col-span-1 pt-4 text-center text-sm text-grey md:pt-0 md:text-right">
        HODL Protocol @ 2025. All Rights Reserved
      </p>
    </footer>
  )
}

export default index

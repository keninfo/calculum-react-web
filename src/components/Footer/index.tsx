import React from 'react'

import Image from 'next/image'

const index = () => {
  return (
    <footer className="mb-24 h-fit items-center rounded-lg bg-dark px-10 py-10 md:mb-0 md:grid md:grid-cols-3">
      <div className="col-span-1 flex items-center justify-center space-x-2 text-grey md:justify-start">
        <p>LinkedIn</p>
        <p>|</p>
        <p>Github</p>
      </div>
      <div className="col-span-1 my-5 flex h-full w-auto items-center justify-center px-20 md:my-0">
        <Image src="/wordmark.svg" width={50} height={100} alt="image" className="h-auto w-full" />
      </div>

      <p className="col-span-1 text-center text-grey md:text-right">Smoothcoin @ 2024. All Rights Reserved</p>
    </footer>
  )
}

export default index

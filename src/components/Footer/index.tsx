import React from 'react'

import Image from 'next/image'

const index = () => {
  return (
    <footer className="mb-24 h-fit items-center rounded-lg bg-smoke px-10 py-10 md:mb-0 md:grid md:grid-cols-3">
      <div className="col-span-1 flex items-center justify-center space-x-2 text-greySmoke md:justify-start">
        <p>LinkedIn</p>
        <p>|</p>
        <p>Github</p>
      </div>
      <Image
        src="/wordmark.svg"
        width={100}
        height={20}
        alt="Picture of the author"
        className="col-span-1 h-4 w-auto"
      />

      <p className="col-span-1 text-center text-greySmoke md:text-right">Smoothcoin @ 2024. All Rights Reserved</p>
    </footer>
  )
}

export default index

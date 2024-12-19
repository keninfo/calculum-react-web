'use client'

import React from 'react'

import Link from 'next/link'

const PoweredByBandit = () => {
  return (
    <div className="flex w-full flex-row items-center justify-center opacity-60">
      <p className="text-[10px] text-offWhite opacity-70 lg:text-xs">Powered by</p>
      <Link
        className="flex cursor-pointer flex-row items-center hover:underline"
        href={'https://bandit.network'}
        target="_blank"
      >
        <img
          className="ml-1 rounded-none"
          height={'12'}
          width={'12'}
          src="https://imagedelivery.net/6iczWBYEbx_1dYNU7ek_bA/49bcce28-c272-46c8-ebf8-6472a9c32e00/medium"
          alt="logo"
        />
        <p className="pl-1 text-[10px] font-semibold text-offWhite lg:text-xs">Bandit</p>
      </Link>
    </div>
  )
}

export { PoweredByBandit }

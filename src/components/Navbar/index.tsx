'use client'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import React from 'react'

import Image from 'next/image'

import NavbarItem from './NavbarItem'
import ProToggle from './ProToggle'
import { navigationItems } from './config'

library.add(fas)

const Sidebar = () => {
  return (
    <div className="left-0 top-0 z-50 w-screen overflow-hidden bg-smoke md:fixed" id="Navbar">
      {/* DESKTOP*/}
      <div className="hidden px-10 md:block">
        <div className="col-span-8 flex items-center justify-between pr-[.5vh]">
          <h1 className="font-bold text-carmesi">BEAR PROTOCOL</h1>
          <div className="flex w-fit items-center justify-start">{navigationItems.map(NavbarItem)}</div>
          <ProToggle />
        </div>
      </div>
      {/* MOBILE */}
      <div className="flex h-fit items-center justify-around p-6 md:hidden">
        <Image src="/bearLogo2.png" width={200} height={80} alt="Picture of the author" className="h-auto w-[50%]" />
        <div className="text-md flex w-full items-center justify-end space-x-2 text-white">
          <p>TESTNET</p>
          <div className="h-3 w-3 animate-pulse rounded-full bg-carmesi"></div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

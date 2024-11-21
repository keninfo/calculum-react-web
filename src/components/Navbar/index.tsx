'use client'

import React from 'react'

import Image from 'next/image'

import NavbarItem from './NavbarItem'
import ProToggle from './ProToggle'
import { navigationItems } from './config'

const Sidebar = () => {
  return (
    <div className="left-0 top-0 z-50 w-screen overflow-hidden bg-none md:absolute" id="Navbar">
      {/* DESKTOP*/}
      <div className="hidden px-20 md:block">
        <div className="flex items-center justify-between pl-2">
          <Image src="/BearProtocol-website-logo.png" width={100} height={50} alt="image" className="h-10 w-auto" />
          <div className="flex w-fit items-center justify-start">{navigationItems.map(NavbarItem)}</div>
          <ProToggle />
        </div>
      </div>
      {/* MOBILE */}
      <div className="flex h-fit items-center justify-around p-6 md:hidden">
        <Image src="/BearProtocol-website-logo.png" width={100} height={20} alt="image" className="h-3 w-auto" />
        <div className="text-md flex w-full items-center justify-end space-x-2 text-offWhite">
          <p>TESTNET</p>
          <div className="h-3 w-3 animate-pulse rounded-full bg-primary"></div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

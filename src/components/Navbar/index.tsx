'use client'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import React from 'react'

import Image from 'next/image'

import MaintenanceBanner from '@/components/MaintenanceBanner'
import CustomConnectButton from '@/components/common/CustomConnectButton'

import NavbarItem from './NavbarItem'
import ProToggle from './ProToggle'
import { navigationItems } from './config'

library.add(fas)

const Sidebar = () => {
  return (
    <div className="absolute | md:fixed top-0 left-0 w-screen bg-smoke z-50 overflow-hidden" id="Navbar">
      {/* DESKTOP*/}
      <MaintenanceBanner />
      <div className="hidden | md:grid grid-cols-11 items-center px-[1.5vw] space-x-[1vw]">
        <div className="col-span-8 flex justify-between items-center pr-[.5vh]">
          <Image src="/bearLogo2.png" width={200} height={80} alt="Picture of the author" className="pl-[2vw]" />
          <div className="flex w-fit justify-start items-center">{navigationItems.map(NavbarItem)}</div>
          <ProToggle />
        </div>
        <div className="col-span-3 flex justify-end items-center ">
          <CustomConnectButton />
        </div>
      </div>
      {/* MOBILE */}
      <div className="flex justify-around items-center h-fit p-6  | md:hidden">
        <Image src="/bearLogo2.png" width={200} height={80} alt="Picture of the author" className="h-auto w-[50%]" />
        <div className="text-md text-white flex justify-end items-center space-x-2 w-full">
          <p>DEV BRANCH</p>
          <div className="h-3 w-3 rounded-full bg-carmesi animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

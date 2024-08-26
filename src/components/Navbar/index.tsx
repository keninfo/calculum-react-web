'use client'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import React, { useContext } from 'react'

import Image from 'next/image'

import { ProContext } from '@/components/AppProviders'
import MaintenanceBanner from '@/components/MaintenanceBanner'
import CustomConnectButton from '@/components/common/CustomConnectButton'
import SmallCustomConnectButton from '@/components/common/CustomConnectButton/small'
import Logo from '@/components/common/Icons/Logo'

import NavbarItem from './NavbarItem'
import ProToggle from './ProToggle'
import { navigationItems } from './config'

library.add(fas)

const Sidebar = () => {
  const { pro } = useContext(ProContext)
  return (
    <div className="absolute | md:fixed top-0 left-0 w-screen bg-smoke z-50 overflow-hidden" id="Navbar">
      {/* DESKTOP*/}
      <MaintenanceBanner />
      <div className="hidden | md:grid grid-cols-11 items-center px-[1.5vw] space-x-[1vw]">
        <div className="col-span-8 flex justify-between items-center pr-[.5vh]">
          {/* <Logo className={`h-[6vh] mr-[4vw] w-fit ${pro ? 'fill-carmesi' : 'fill-white'}`} /> */}
          <Image src="/bearLogo2.png" width={200} height={80} alt="Picture of the author" className="pl-[2vw]" />
          <div className="flex w-fit justify-start items-center">{navigationItems.map(NavbarItem)}</div>
          <ProToggle />
        </div>

        <div className="col-span-3 flex justify-end items-center ">
          <CustomConnectButton />
        </div>
      </div>

      {/* MOBILE */}
      <div className="grid grid-cols-4 h-fit py-[3vh] px-[5vw] | md:hidden">
        <div className="col-span-1 flex justify-start items-center">
          <SmallCustomConnectButton />
        </div>
        <Logo className={`h-full w-full col-span-2 ${pro ? 'fill-carmesi' : 'fill-white'}`} />
        <div className="col-span-1 flex justify-end items-center">
          <ProToggle />
        </div>
      </div>
    </div>
  )
}

export default Sidebar

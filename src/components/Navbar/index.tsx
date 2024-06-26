import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import React, { useContext } from 'react'

import { ProContext } from '@/components/AppProviders'
import MaintenanceBanner from '@/components/MaintenanceBanner'

import CustomConnectButton from '../common/CustomConnectButton'
import SmallCustomConnectButton from '../common/CustomConnectButton/small'
import Logo from '../common/Icons/Logo'
import NavbarItem from './NavbarItem'
import ProToggle from './ProToggle'
import { navigationItems } from './config'

library.add(fas)

const Sidebar = () => {
  const { pro } = useContext(ProContext)
  return (
    <div className="absolute | md:fixed top-0 left-0 w-screen bg-smoke z-50">
      {/* DESKTOP*/}
      <MaintenanceBanner />
      <div className="hidden | md:flex justify-between items-center px-[2.5vw]">
        <Logo className={`h-[6vh] mr-[4vw] w-fit ${pro ? 'fill-carmesi' : 'fill-white'}`} />
        <div className="flex w-fit justify-left items-center">{navigationItems.map(NavbarItem)}</div>
        <div className="w-fit flex justify-between items-center space-x-[2vh]">
          <CustomConnectButton />
          <ProToggle />
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

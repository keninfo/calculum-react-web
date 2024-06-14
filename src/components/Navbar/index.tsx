import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import React, { useContext } from 'react'

import MaintenanceBanner from '@/components/MaintenanceBanner'

import { ProContext } from '../AppProviders'
import ConnectButton from '../common/ConnectButton'
import NavbarItem from './NavbarItem'
import ProToggle from './ProToggle'
import { navigationItems } from './config'

library.add(fas)

const Sidebar = () => {
  const { pro } = useContext(ProContext)
  return (
    <div className="fixed top-0 left-0 w-screen bg-smoke z-50">
      <MaintenanceBanner />
      <div className=" flex justify-between items-center px-[2.5vw]">
        <img src={`${pro ? '/red.svg' : '/white.svg'}`} alt="Bear Protocol" className="h-[6vh] mr-[4vw]" />
        <div className="flex w-fit justify-left items-center">{navigationItems.map(NavbarItem)}</div>
        <div className="w-fit flex justify-between items-center space-x-[2vh]">
          <ConnectButton />
          <ProToggle />
        </div>
      </div>
    </div>
  )
}

export default Sidebar

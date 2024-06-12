import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import React from 'react'

import MaintenanceBanner from '@/components/MaintenanceBanner'

import ConnectButton from '../common/ConnectButton'
import NavbarItem from './NavbarItem'
import { navigationItems } from './config'

library.add(fas)

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 w-screen bg-smoke z-50">
      <MaintenanceBanner />
      <div className=" flex justify-between items-center px-[3vw]">
        <img src="/red.svg" alt="Bear Protocol" className="h-[6vh] mr-[4vw]" />
        <div className="flex w-fit justify-left items-center">{navigationItems.map(NavbarItem)}</div>
        <div className="w-[20vw]">
          <ConnectButton />
        </div>
      </div>
    </div>
  )
}

export default Sidebar

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import React from 'react'

import ConnectButton from '../common/ConnectButton'
import NavbarItem from './NavbarItem'
import { navigationItems } from './config'

library.add(fas)

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 w-screen bg-darkness flex justify-between items-center px-[4vw] z-10">
      <img src="/red.svg" alt="Bear Protocol" className="h-[6vh] mr-[4vw]" />
      <div className="flex w-fit justify-left items-center">{navigationItems.map(NavbarItem)}</div>
      <div className="w-[20vw]">
        <ConnectButton />
      </div>
    </div>
  )
}

export default Sidebar

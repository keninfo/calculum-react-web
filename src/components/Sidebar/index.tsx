import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import React, { useContext } from 'react'

import { SidebarContext } from '@/components/AppProviders'

import SidebarFooter from './SidebarFooter'
import SidebarGroup from './SidebarGroup'
import { navigationGroups } from './config'

library.add(fas)

const Sidebar = () => {
  const { isSidebarOpen } = useContext(SidebarContext)

  // const changeSidebar = () => {
  //   setSidebarOpen((prevstate) => !prevstate)
  // }

  return (
    <div className={`fixed top-0 left-0 h-screen bg-darkness mt-[2vh] ${isSidebarOpen ? 'w-[20lvw]' : 'w-[10lvw]'}`}>
      {/* {isSidebarOpen && (
        <button
          className="absolute -right-16 top-[50%] transform -translate-y-1/2 bg-smoke p-6 pr-20 z-100 rounded-lg"
          onClick={changeSidebar}
        >
          <FontAwesomeIcon icon={['fas', 'angles-left' as IconName]} size="lg" />
        </button>
      )} */}
      <img
        src={!isSidebarOpen ? '/smallLogo.svg' : '/red.svg'}
        alt="Bear Protocol"
        className={`${isSidebarOpen ? 'w-[100%] p-[5vh]' : 'h-[5vh] mx-auto m-[5vh]'}`}
      />
      <div className="px-[4vw]">{navigationGroups.map(SidebarGroup)}</div>

      <SidebarFooter />
    </div>
  )
}

export default Sidebar

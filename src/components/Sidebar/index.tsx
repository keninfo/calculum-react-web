import { library } from '@fortawesome/fontawesome-svg-core'
import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React, { useContext } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { SidebarContext } from '@/components/AppProviders'
import ConnectButton from '@/components/common/ConnectButton'
import SmallConnectButton from '@/components/common/ConnectButton/small'

import { navigationGroups, type NavigationGroup, type NavigationItem } from './config'

library.add(fas)

const Sidebar = () => {
  const pathname = usePathname()
  const { isSidebarOpen, setSidebarOpen } = useContext(SidebarContext)

  const MenuItem = (item: NavigationItem) => {
    return (
      <div
        key={item.name}
        className={`my-[2.5vh] ${pathname == item.link ? 'text-carmesi' : ''}  ${!isSidebarOpen ? ' w-full flex justify-center mb-10' : ''}`}
      >
        <Link href={item.link} className="flex justify-start space-x-3 hover:text-carmesi ">
          <div className="w-10 flex justify-center items-center">
            <FontAwesomeIcon icon={['fas', item.icon as IconName]} />
          </div>
          {isSidebarOpen && <p className="text-[2vh]">{item.name}</p>}
        </Link>
      </div>
    )
  }

  const MenuGroup = (group: NavigationGroup) => {
    return (
      <div key={group.name} className="w-full mb-10">
        {isSidebarOpen && <p className="text-[1.5vh]">{group.name}</p>}
        {group.list.map(MenuItem)}
      </div>
    )
  }

  const changeSidebar = () => {
    setSidebarOpen((prevstate) => !prevstate)
  }

  return (
    <div className={`fixed top-0 left-0 h-screen  bg-darkness ${isSidebarOpen ? 'w-[20vw]' : 'w-[10vw]'}`}>
      {isSidebarOpen && (
        <button
          className="absolute -right-16 top-[50vh] bg-smoke p-6 pr-20 -translate-y-full z-100 rounded-lg"
          onClick={changeSidebar}
        >
          <FontAwesomeIcon icon={['fas', 'angles-left' as IconName]} />
        </button>
      )}
      <img src="/red.svg" alt="Bear Protocol" className="w-[100%] p-10" />
      <div className="px-10">{navigationGroups.map(MenuGroup)}</div>

      <div className="absolute bottom-10 px-10 w-[100%]">
        {!isSidebarOpen && (
          <button className="w-full mt-20-translate-y-full z-100 rounded-lg mb-10 text-2xl" onClick={changeSidebar}>
            <FontAwesomeIcon icon={['fas', 'angles-right' as IconName]} />
          </button>
        )}
        {!isSidebarOpen && <SmallConnectButton />}
        {isSidebarOpen && <ConnectButton />}
      </div>
    </div>
  )
}

export default Sidebar

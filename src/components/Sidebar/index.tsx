import { library } from '@fortawesome/fontawesome-svg-core'
import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import SidebarFooter from './SidebarFooter'
import type { NavigationGroup, NavigationItem } from './config'
import { navigationGroups } from './config'

library.add(fas)

const Sidebar = () => {
  const pathname = usePathname()

  const MenuItem = (item: NavigationItem) => {
    return (
      <div key={item.name} className={`my-6 ${pathname == item.link ? 'text-carmesi' : ''}`}>
        <Link href={item.link} className="flex justify-start space-x-3 hover:text-carmesi">
          <div className="w-10 flex justify-center items-center">
            <FontAwesomeIcon icon={['fas', item.icon as IconName]} />
          </div>
          <div>{item.name}</div>
        </Link>
      </div>
    )
  }

  const MenuGroup = (group: NavigationGroup) => {
    return (
      <div key={group.name} className="my-16">
        <p>{group.name}</p>
        {group.list.map(MenuItem)}
      </div>
    )
  }

  return (
    <div className="fixed top-0 left-0 h-screen w-2/5 bg-darkness p-10">
      <img src="/red.svg" alt="Bear Protocol" className="w-[10vw] mt-10" />
      {navigationGroups.map(MenuGroup)}
      <SidebarFooter />
    </div>
  )
}

export default Sidebar

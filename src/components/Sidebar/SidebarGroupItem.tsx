import { library } from '@fortawesome/fontawesome-svg-core'
import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React, { useContext } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { SidebarContext } from '@/components/AppProviders'

import type { NavigationItem } from './config'

library.add(fas)

const SidebarGroupItem = (item: NavigationItem) => {
  const pathname = usePathname()
  const { isSidebarOpen } = useContext(SidebarContext)
  return (
    <div
      key={item.name}
      className={`my-[3vh] ${pathname == item.link ? 'text-carmesi' : ''} 
      ${!isSidebarOpen ? 'w-full flex justify-center mb-[5vh]' : ''}`}
    >
      <Link href={item.link} className="flex justify-start space-x-3 hover:text-carmesi ">
        <div className="w-10 flex justify-center items-center text-[2vh]">
          <FontAwesomeIcon icon={['fas', item.icon as IconName]} size="lg" />
        </div>
        {isSidebarOpen && <p className="text-[1.8vh]">{item.name}</p>}
      </Link>
    </div>
  )
}

export default SidebarGroupItem

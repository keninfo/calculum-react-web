import React, { useContext } from 'react'

import { SidebarContext } from '@/components/AppProviders'

import SidebarGroupItem from './SidebarGroupItem'
import type { NavigationGroup } from './config'

const SidebarGroup = (group: NavigationGroup) => {
  const { isSidebarOpen } = useContext(SidebarContext)
  return (
    <div key={group.name} className="w-full mb-[5vh] ml-[1vw]">
      {isSidebarOpen && <p className="text-[1.5vh]">{group.name}</p>}
      {group.list.map(SidebarGroupItem)}
    </div>
  )
}

export default SidebarGroup

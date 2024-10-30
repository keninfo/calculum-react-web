import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { NavigationItem } from './config'

library.add(fas)

const NavbarItem = (item: NavigationItem) => {
  const pathname = usePathname()
  const isActive = pathname.endsWith(item.link)

  return (
    <div key={item.name}>
      <Link href={item.link} className="flex items-center justify-start hover:text-carmesi" target={item.target}>
        <p
          className={`mx-[1vw] px-[1vw] py-[4vh] ${isActive ? 'border-b-4 border-b-carmesi bg-smoke font-bold text-carmesi' : 'mb-[4px] text-[2vh]'}`}
        >
          {item.name.toUpperCase()}
        </p>
      </Link>
    </div>
  )
}

export default NavbarItem

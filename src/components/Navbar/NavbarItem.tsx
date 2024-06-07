import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { NavigationItem } from './config'

library.add(fas)

const NavbarItem = (item: NavigationItem) => {
  const pathname = usePathname()
  return (
    <div key={item.name}>
      <Link href={item.link} className="flex items-center justify-start  hover:text-carmesi ">
        <p
          className={` px-[3vw] py-[3vh] ${pathname == item.link ? 'text-[3vh] bg-smoke text-carmesi font-bold' : 'text-[2vh]'}`}
        >
          {item.name.toUpperCase()}
        </p>
      </Link>
    </div>
  )
}

export default NavbarItem

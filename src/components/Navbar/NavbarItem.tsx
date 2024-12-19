import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { NavigationItem } from './config'

const NavbarItem = (item: NavigationItem) => {
  const pathname = usePathname()
  const isActive = pathname.endsWith(item.link)

  return (
    <div key={item.name}>
      <Link href={item.link} className="flex items-center justify-start hover:text-primary" target={item.target}>
        <p
          className={`mx-[1vw] w-full px-[1vw] py-2 text-right md:w-fit md:py-[4vh] ${isActive ? 'bg-none text-primary md:border-b-4 md:border-t-4 md:border-b-primary md:border-t-transparent' : 'md:border-b-4 md:border-t-4 md:border-b-transparent md:border-t-transparent'}`}
        >
          {item.name.toUpperCase()}
        </p>
      </Link>
    </div>
  )
}

export default NavbarItem

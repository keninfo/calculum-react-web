import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { NavigationItem } from './config'

import { twMerge } from 'tailwind-merge'

const NavbarItem = (item: NavigationItem) => {
  const pathname = usePathname()
  const isActive = pathname.endsWith(item.link)

  return (
    <div key={item.name}>
      <Link href={item.link} className="flex items-center justify-start hover:text-primary" target={item.target}>
        <p
          className={twMerge(
            'mx-[1vw] w-full px-[1vw] py-2 text-right capitalize md:w-fit md:py-5',
            // isActive && 'bg-none text-primary underline decoration-primary underline-offset-8',
            isActive && 'border-b-2 border-b-primary bg-none text-primary',
          )}
        >
          {item.name.toUpperCase()}
        </p>
      </Link>
    </div>
  )
}

export default NavbarItem

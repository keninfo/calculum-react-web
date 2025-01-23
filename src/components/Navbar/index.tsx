'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMeasure } from '@uidotdev/usehooks'

import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { useNavbarStore } from '@/store/useNavbarStore'

import Card from '../common/Card'
import NavbarItem from './NavbarItem'
import { navigationItems } from './config'

const Sidebar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false)
  const [navbar, { height }] = useMeasure()
  const { setNavbarHeight } = useNavbarStore()
  const [parent] = useAutoAnimate()

  const handleNavbarToggle = () => {
    setIsNavbarOpen((prev) => !prev)
  }

  useEffect(() => {
    setNavbarHeight(height || 136)
  }, [height, setNavbarHeight])

  return (
    <div className="relative z-50 w-screen overflow-hidden bg-none" id="Navbar" ref={navbar}>
      {/* DESKTOP*/}
      <div className="hidden px-20 md:block">
        <div className="flex items-center justify-between pl-2">
          <Image src="/hodllogo.svg" width={100} height={100} alt="image" className="flex h-6 w-fit justify-start" />
          <div className="flex w-3/5 items-center justify-center">{navigationItems.map(NavbarItem)}</div>
          <div className="flex w-1/5 justify-end">{/* <ProToggle /> */}</div>
        </div>
      </div>
      {/* MOBILE */}
      <div className="flex h-fit items-center justify-around p-6 md:hidden">
        <Image src="/hodllogo.svg" width={100} height={20} alt="image" className="h-5 w-auto" />
        <p className="flex w-full justify-end text-lg" onClick={handleNavbarToggle}>
          {!isNavbarOpen && <FontAwesomeIcon icon={['fas', 'bars' as IconName]} />}
          {isNavbarOpen && <FontAwesomeIcon icon={['fas', 'xmark' as IconName]} />}
        </p>
      </div>
      <div className="px-5" ref={parent}>
        {isNavbarOpen && (
          <Card className="mb-4 w-full text-offWhite md:hidden">
            <ul className="[&_li]:py-2 [&_li]:text-center">
              <div className="">{navigationItems.map(NavbarItem)}</div>
            </ul>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Sidebar

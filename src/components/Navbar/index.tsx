'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMeasure } from '@uidotdev/usehooks'

import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import Card from '@/components/common/Card'
import CustomConnectButton from '@/components/common/CustomConnectButton'
import { useNavbarStore } from '@/store/useNavbarStore'

// import { useProStore } from '@/store/useProStore'
import NavbarItem from './NavbarItem'
import { navigationItems } from './config'

const Sidebar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false)
  const [navbar, { height }] = useMeasure()
  const { setNavbarHeight } = useNavbarStore()
  const [parent] = useAutoAnimate()
  // const { pro } = useProStore()

  const handleNavbarToggle = () => {
    setIsNavbarOpen((prev) => !prev)
  }

  useEffect(() => {
    setNavbarHeight(height || 136)
  }, [height, setNavbarHeight])

  return (
    <div className={`fixed top-0 z-50 w-screen overflow-hidden`} id="Navbar" ref={navbar}>
      {/* DESKTOP*/}
      <div className="hidden px-20 md:block">
        <div className="grid grid-cols-12 items-center">
          <Image
            src="/logo/main_logo.svg"
            width={1000}
            height={1000}
            alt="image"
            className="col-span-2 flex w-32 justify-start"
          />
          <div className="col-span-8 flex items-center justify-center">{navigationItems.map(NavbarItem)} </div>
          <div className="col-span-2 ml-4 flex justify-end">
            <CustomConnectButton />
          </div>
        </div>
      </div>
      {/* MOBILE */}
      <div className="flex h-fit items-center justify-around gap-4 p-6 md:hidden">
        <Image src="/HODLSmall.png" width={100} height={20} alt="image" className="h-10 w-auto" />
        <div className="flex w-full justify-center">
          <CustomConnectButton />
        </div>
        <p className="flex w-fit justify-end text-2xl" onClick={handleNavbarToggle}>
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

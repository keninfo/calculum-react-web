'use client'

import { useMeasure } from '@uidotdev/usehooks'

import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { useNavbarStore } from '@/store/useNavbarStore'

import ActionAlert from '../common/ActionAlert'
import NavbarItem from './NavbarItem'
import ProToggle from './ProToggle'
import { navigationItems } from './config'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [navbar, { height }] = useMeasure()
  const { setNavbarHeight } = useNavbarStore()

  const handleClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    setNavbarHeight(height || 136)
  }, [height, setNavbarHeight])

  return (
    <div className="relative z-50 w-screen overflow-hidden bg-none" id="Navbar" ref={navbar}>
      {isOpen && (
        <ActionAlert
          closeAction={handleClose}
          alert="Thanks for visiting Bear Protocol. This app is currently on Beta, and best viewed on desktop. Mobile version will follow soon."
        />
      )}
      {/* DESKTOP*/}
      <div className="hidden px-20 md:block">
        <div className="flex items-center justify-between pl-2">
          <Image src="/wordmark.svg" width={100} height={50} alt="image" className="flex h-4 w-fit justify-start" />
          <div className="flex w-3/5 items-center justify-center">{navigationItems.map(NavbarItem)}</div>
          <div className="flex w-1/5 justify-end">
            <ProToggle />
          </div>
        </div>
      </div>
      {/* MOBILE */}
      <div className="flex h-fit items-center justify-around p-6 md:hidden">
        <Image src="/wordmark.svg" width={100} height={20} alt="image" className="h-3 w-auto" />
        <div className="text-md flex w-full items-center justify-end space-x-2 text-offWhite">
          <p>TESTNET</p>
          <div className="h-3 w-3 animate-pulse rounded-full bg-primary"></div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

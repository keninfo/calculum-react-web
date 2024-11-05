'use client'

import React from 'react'

import { usePathname } from 'next/navigation'

const Index = () => {
  const pathname = usePathname()
  return (
    <div className="flex h-screen w-full items-center justify-center bg-eerie">
      <div>
        <h1 className="text-center text-citron">404 `{pathname.toUpperCase().slice(1)}` NOT FOUND</h1>
        <p className="text-center text-offWhite">Page doesn`t exist</p>
      </div>
    </div>
  )
}

export default Index

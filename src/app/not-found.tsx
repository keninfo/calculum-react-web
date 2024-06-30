'use client'

import React from 'react'

import { usePathname } from 'next/navigation'

const Index = () => {
  const pathname = usePathname()
  return (
    <div className="h-screen">
      <h1 className="text-red-500">{pathname.toUpperCase().slice(1)}</h1>
      <p>Page doesn`t exist yet</p>
    </div>
  )
}

export default Index

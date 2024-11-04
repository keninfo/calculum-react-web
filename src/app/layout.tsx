'use client'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import { type ReactNode } from 'react'

import { usePathname } from 'next/navigation'

import AppProviders from '@/components/AppProviders'
import Navbar from '@/components/Navbar'
import Watermark from '@/components/common/Watermark'
import '@/styles/globals.css'

library.add(fas)

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  const pathname = usePathname()

  return (
    <html lang="en">
      <body className="classic overscroll-none">
        <Watermark />
        <AppProviders>
          {pathname !== '/' && <Navbar />}
          <div className="bg-smoke md:px-20">{children}</div>
        </AppProviders>
      </body>
    </html>
  )
}

export default RootLayout

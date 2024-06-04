'use client'

import { type ReactNode } from 'react'

import AppProviders from '@/components/AppProviders'
import MaintenanceBanner from '@/components/MaintenanceBanner'
import Navbar from '@/components/Navbar'
import { Providers } from '@/store/provider'
import '@/styles/globals.css'

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return (
    <html lang="en">
      <body className="overscroll-none">
        <Providers>
          <AppProviders>
            <MaintenanceBanner />
            <div className="mt-[10vh] px-[2vw] pt-[4vh] bg-smoke pb-[4vh] ">{children}</div>
            <Navbar />
          </AppProviders>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout

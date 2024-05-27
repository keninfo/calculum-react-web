'use client'

import { useContext, type ReactNode } from 'react'

import { SidebarContext } from '@/components/AppProviders'
import AppProviders from '@/components/AppProviders'
import MaintenanceBanner from '@/components/MaintenanceBanner'
import Sidebar from '@/components/Sidebar'
import { Providers } from '@/store/provider'
import '@/styles/globals.css'

const scrollbarWidth = 15

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
            <SidebarWrapper>{children}</SidebarWrapper>
            <Sidebar />
          </AppProviders>
        </Providers>
      </body>
    </html>
  )
}

const SidebarWrapper = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  const { isSidebarOpen } = useContext(SidebarContext)

  return (
    <div
      className={`transition-all ease-in-out duration-300 absolute right-0 top-0 h-fit z-10 bg-smoke rounded-l-[50px] py-10 px-14  ${!isSidebarOpen ? 'w-[90lvw]' : 'w-[80lvw]'}`}
      style={{ width: `calc(${isSidebarOpen ? '80vw' : '90vw'} - ${scrollbarWidth}px)` }}
    >
      {children}
    </div>
  )
}

export default RootLayout

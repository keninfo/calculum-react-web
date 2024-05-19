'use client'

import { useContext, type ReactNode } from 'react'

import { SidebarContext } from '@/components/AppProviders'
import AppProviders from '@/components/AppProviders'
import Sidebar from '@/components/Sidebar'
import { Providers } from '@/store/provider'
import '@/styles/globals.css'

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppProviders>
            <main className="relative bg-darkness">
              <SidebarWrapper>{children}</SidebarWrapper>
              <Sidebar />
            </main>
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
      className={`transition-all ease-in-out duration-300 absolute right-0 top-0 h-fit z-10 bg-smoke rounded-l-[50px] p-10 shadow-2xl ${
        !isSidebarOpen ? 'w-[90vw]' : 'w-[80vw]'
      }`}
    >
      {children}
    </div>
  )
}

export default RootLayout

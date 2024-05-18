'use client'

import { type ReactNode } from 'react'

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
          <main className="relative">
            <AppProviders>
              <div className="absolute right-0 top-0 h-fit w-5/6 z-10 bg-smoke rounded-l-[50px] p-10 shadow-2xl">
                {children}
              </div>
              <Sidebar />
            </AppProviders>
          </main>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout

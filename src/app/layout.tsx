'use client'

import { type ReactNode } from 'react'

import AppProviders from '@/components/AppProviders'
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
            <div className="mt-[15vh] px-[2vw] pb-[2vw] bg-smoke ">{children}</div>
            <Navbar />
          </AppProviders>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout

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
      <body className="overscroll-none classic">
        <Providers>
          <AppProviders>
            <Navbar />
            <div className="md:px-[1vw] pb-[.5vw] bg-smoke">{children}</div>
          </AppProviders>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout

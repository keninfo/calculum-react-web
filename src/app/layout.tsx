import { type ReactNode } from 'react'

import type { Metadata } from 'next'

import AppProviders from '@/components/AppProviders'
import Navbar from '@/components/Navbar'
import { Providers } from '@/store/provider'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Bear Protocol',
}

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
            <div className="md:px-[1vw] pb-[.5vw]  bg-gradient-to-t from-darkness to-smoke">{children}</div>
          </AppProviders>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout

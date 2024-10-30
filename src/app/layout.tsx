import { type ReactNode } from 'react'

import type { Metadata } from 'next'

import AppProviders from '@/components/AppProviders'
import Navbar from '@/components/Navbar'
import Watermark from '@/components/common/Watermark'
import { Providers } from '@/store/provider'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Smoothcoin',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return (
    <html lang="en">
      <body className="classic overscroll-none">
        <Watermark />
        <Providers>
          <AppProviders>
            <Navbar />
            <div className="bg-smoke md:px-20">{children}</div>
          </AppProviders>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout

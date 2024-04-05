'use client'

import type { ReactNode } from 'react'

import AppProviders from '@/components/AppProviders'
import { CssBaseline } from '@mui/material'

import '@/styles/globals.css'
import { Providers } from '@/store/provider'

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main>
            <AppProviders>
              <CssBaseline />
              {children}
            </AppProviders>
          </main>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout

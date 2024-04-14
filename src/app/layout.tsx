'use client'

import type { ReactNode } from 'react'

import { CssBaseline } from '@mui/material'

import AppProviders from '@/components/AppProviders'
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

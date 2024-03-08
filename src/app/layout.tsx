'use client'

import type { ReactNode } from 'react'

import { CssBaseline } from '@mui/material'
import AppProviders from '@/components/AppProviders'

import '@/styles/globals.css'

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return (
    <html lang="en">
      <body>
        <main>
          <AppProviders>
            <CssBaseline />
            {children}
          </AppProviders>
        </main>
      </body>
    </html>
  )
}

export default RootLayout

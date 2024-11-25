'use client'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Analytics } from '@vercel/analytics/react'

import { type ReactNode } from 'react'

import { Inter } from 'next/font/google'
import { usePathname } from 'next/navigation'

import AppProviders from '@/components/AppProviders'
import Navbar from '@/components/Navbar'
import Watermark from '@/components/common/Watermark'
import { useProStore } from '@/store/useProStore'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

library.add(fas)

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  const pathname = usePathname()
  const { pro } = useProStore()

  return (
    <html lang="en">
      <body
        className={`classic overscroll-none bg-cover bg-fixed bg-center ${inter.className} ${
          pro ? "bg-[url('/bgPro.png')]" : "bg-[url('/bg.png')]"
        }`}
      >
        <Watermark />
        <AppProviders>
          {pathname !== '/' && pathname !== '/devcon' && <Navbar />}
          <div className="md:px-20">{children}</div>
        </AppProviders>
      </body>
      <Analytics />
    </html>
  )
}

export default RootLayout

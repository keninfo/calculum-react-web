'use client'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'

import { useEffect, useState, type ReactNode } from 'react'

import { Space_Grotesk, Oxanium } from 'next/font/google'

import AppProviders from '@/components/AppProviders'
import Bearam from '@/components/Bearam'
import Navbar from '@/components/Navbar'
import Watermark from '@/components/common/Watermark'
import { useProStore } from '@/store/useProStore'
import '@/styles/globals.css'

import { hotjar } from 'react-hotjar'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })
const oxanium = Oxanium({ subsets: ['latin'] })

library.add(fas)

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  const { pro } = useProStore()
  const [isBear, setIsBear] = useState(false)

  useEffect(() => {
    hotjar.initialize({ id: 5265506, sv: 6 })
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsBear(window.location.hostname.includes('bearam'))
    }
  }, [])

  if (!isBear) {
    return (
      <html lang="en">
        <body
          className={`classic overscroll-none bg-cover bg-fixed bg-center ${spaceGrotesk.className} ${oxanium.className} ${
            pro ? "bg-[url('/bgPro.png')]" : "bg-[url('/bg.png')]"
          }`}
        >
          <Watermark />
          <AppProviders>
            <Navbar />
            <div className="md:px-20">{children}</div>
          </AppProviders>
        </body>
        <Analytics />
        <GoogleAnalytics gaId="G-ZJQN25MV06" />
      </html>
    )
  }
  if (isBear) {
    return (
      <html lang="en">
        <body
          className={`classic overscroll-none bg-cover bg-fixed bg-center ${spaceGrotesk.className} ${oxanium.className} }`}
        >
          <AppProviders>
            <Bearam />
          </AppProviders>
        </body>
      </html>
    )
  }
}

export default RootLayout

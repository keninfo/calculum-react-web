'use client'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'

import { useEffect, useState, type ReactNode } from 'react'

import { Space_Grotesk, Roboto } from 'next/font/google'
import { usePathname } from 'next/navigation'

import AppProviders from '@/components/AppProviders'
import Bearam from '@/components/Bearam'
import Navbar from '@/components/Navbar'
import Watermark from '@/components/common/Watermark'
// import { useProStore } from '@/store/useProStore'
import '@/styles/globals.css'

import { hotjar } from 'react-hotjar'
import { twMerge } from 'tailwind-merge'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })
const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'] })

library.add(fas)
const bgRoutes = ['/home']

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  const actualPath = usePathname()

  // const { pro } = useProStore()
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
        <body className={`classic relative overscroll-none bg-[#1e1e1e] ${spaceGrotesk.className} ${roboto.className}`}>
          <Watermark />
          <AppProviders>
            <Navbar />
            <main className={twMerge(bgRoutes.includes(actualPath) && 'bg-home-section bg-cover bg-no-repeat')}>
              {children}
            </main>
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
          className={`classic overscroll-none bg-cover bg-fixed bg-center ${spaceGrotesk.className} ${roboto.className} }`}
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

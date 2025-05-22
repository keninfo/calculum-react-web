'use client'

import React, { useState } from 'react'

import { Space_Grotesk, Roboto } from 'next/font/google'

import { useAccount } from 'wagmi'

import { BanditProvider } from '@/services/BanditProvider'
import { useNavbarStore } from '@/store/useNavbarStore'

import CustomCampaign from './CustomCampaign'
import CustomLeaderboard from './CustomLeaderboard'
import UserCard from './UserCard'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })
const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'] })

const Bandit = () => {
  const { isConnected } = useAccount()
  const { navbarHeight } = useNavbarStore()

  // State to trigger reload
  const [reloadKey, setReloadKey] = useState(0)

  // Function to trigger a reload
  const triggerReload = () => {
    setReloadKey((prev) => prev + 1)
  }

  return (
    <BanditProvider>
      <div className={`${spaceGrotesk.className} ${roboto.className}`} style={{ marginTop: navbarHeight }}>
        <h1 className="py-10 pl-2 text-3xl text-offWhite">LEADERBOARD</h1>
        <CustomLeaderboard campaignId={3857} key={reloadKey} />
        <h1 className="py-10 pl-2 text-3xl text-offWhite">QUESTS</h1>
        <div className="w-full grid-cols-12 gap-4 md:grid">
          <div className="col-span-9 h-full space-y-4">
            <CustomCampaign campaignId={3856} onAction={triggerReload} />
            <CustomCampaign campaignId={3858} onAction={triggerReload} />
          </div>
          <div className="col-span-3 mt-0 hidden h-full md:block">
            <UserCard campaignId={3857} key={reloadKey} />
          </div>
        </div>
        <div className={`${isConnected ? 'h-[50vh]' : 'h-fit'} mt-4 md:hidden`}>
          <UserCard campaignId={3857} key={reloadKey} />
        </div>
        <p className="mt-4 w-full text-center text-xs text-citron md:hidden">
          Earned Moontonium may take a few minutes to be reflected
        </p>
      </div>
    </BanditProvider>
  )
}

export default Bandit

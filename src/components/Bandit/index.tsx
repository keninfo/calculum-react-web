'use client'

import React, { useState } from 'react'

import { useAccount } from 'wagmi'

import { BanditProvider } from '@/services/BanditProvider'

import CustomCampaign from './CustomCampaign'
import CustomLeaderboard from './CustomLeaderboard'
import UserCard from './UserCard'

const Bandit = () => {
  const { isConnected } = useAccount()

  // State to trigger reload
  const [reloadKey, setReloadKey] = useState(0)

  // Function to trigger a reload
  const triggerReload = () => {
    setReloadKey((prev) => prev + 1)
  }

  return (
    <BanditProvider>
      <div className={`${isConnected ? 'h-[50vh]' : 'h-fit'} md:hidden`}>
        <UserCard campaignId={3857} key={reloadKey} />
      </div>
      <p className="mt-4 w-full text-center text-xs text-citron md:hidden">
        Earned Moontonium may take a few minutes to be reflected
      </p>
      <h1 className="my-10 text-3xl text-offWhite">QUESTS</h1>
      <div className="w-full grid-cols-12 gap-4 md:grid">
        <div className="col-span-9 h-full space-y-4">
          <CustomCampaign campaignId={3856} onAction={triggerReload} />
          <CustomCampaign campaignId={3858} onAction={triggerReload} />
        </div>
        <div className="col-span-3 mt-0 hidden h-full md:block">
          <UserCard campaignId={3857} key={reloadKey} />
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <h2 className="my-10 text-3xl text-offWhite">LEADERBOARD</h2>{' '}
        <p className="hidden w-fit text-right text-xs text-citron md:block">
          Earned Moontonium may take a few minutes to be reflected
        </p>
      </div>
      <CustomLeaderboard campaignId={3857} key={reloadKey} />
    </BanditProvider>
  )
}

export default Bandit

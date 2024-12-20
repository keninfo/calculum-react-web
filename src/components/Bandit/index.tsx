'use client'

import React from 'react'

import { useAccount } from 'wagmi'

import { BanditProvider } from '@/services/BanditProvider'

import CustomCampaign from './CustomCampaign'
import CustomLeaderboard from './CustomLeaderboard'
import UserCard from './UserCard'

const Bandit = () => {
  const { isConnected } = useAccount()
  return (
    <BanditProvider>
      <div className={`${isConnected ? 'h-[50vh]' : 'h-fit'} md:hidden`}>
        <UserCard campaignId={3857} />
      </div>
      <h1 className="my-10 text-3xl text-offWhite">QUESTS</h1>
      <div className="w-full grid-cols-12 gap-4 md:grid">
        <div className="col-span-9 h-full space-y-4">
          <CustomCampaign campaignId={3856} />
          <CustomCampaign campaignId={3858} />
        </div>
        <div className="col-span-3 mt-0 hidden h-full md:block">
          <UserCard campaignId={3857} />
        </div>
      </div>
      <h2 className="my-10 text-3xl text-offWhite">LEADERBOARD</h2>
      <CustomLeaderboard campaignId={3857} />
    </BanditProvider>
  )
}

export default Bandit

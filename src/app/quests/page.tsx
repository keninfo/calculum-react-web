'use client'

import { BanditContextProvider } from '@bandit-network/react'

import Head from 'next/head'

import { useAccount } from 'wagmi'

import CustomCampaign from '@/components/Bandit/CustomCampaign'
import CustomLeaderboard from '@/components/Bandit/CustomLeaderboard'
import UserCard from '@/components/Bandit/UserCard'
import Footer from '@/components/Footer'
import MetaTags from '@/components/common/MetaTags'
import { PoweredByBandit } from '@/components/common/PoweredByBandit'

const LeaderboardPage = () => {
  const { isConnected } = useAccount()
  return (
    <>
      <Head>
        <title>Bearprotocol - Quests</title>
        <MetaTags />
      </Head>

      <main className="px-5 md:px-0">
        <BanditContextProvider apiKey="1228fb10ed7e478ca4c89dd51d8f5772">
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
        </BanditContextProvider>
      </main>
      <div className="my-10">
        <PoweredByBandit />
      </div>
      <Footer />
    </>
  )
}

export default LeaderboardPage

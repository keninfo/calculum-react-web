'use client'

import type { LeaderboardRenderArgsType, RenderArgsType } from '@bandit-network/react'
import { BanditContextProvider, Campaign, Leaderboard } from '@bandit-network/react'

import Head from 'next/head'

import { useAccount } from 'wagmi'

import { Segment } from '@/components/Bandit/Segment'
import Footer from '@/components/Footer'
import Card from '@/components/common/Card'
import CustomConnectButton from '@/components/common/CustomConnectButton'
import MetaTags from '@/components/common/MetaTags'
import { PoweredByBandit } from '@/components/common/PoweredByBandit'
import { shortenAddress } from '@/utils/formatters'

const LeaderboardPage = () => {
  const { isConnected } = useAccount()
  return (
    <>
      <Head>
        <title>Bearprotocol - Leaderboard</title>
        <MetaTags />
      </Head>

      <main className="px-5 md:px-0">
        <BanditContextProvider apiKey="1228fb10ed7e478ca4c89dd51d8f5772">
          <div className="h-[50vh] md:hidden">
            <Card className="h-full w-full overflow-y-hidden text-offWhite">
              <CustomConnectButton />
              <Leaderboard
                campaignId={3857}
                render={(args: LeaderboardRenderArgsType) => {
                  const { userQuery } = args
                  const user = userQuery.data
                  let rocketHeight = 0
                  if (user && user.xp) {
                    rocketHeight = user?.xp + 5
                  }

                  if (user?.rank !== 0 && isConnected) {
                    return (
                      <div className="relative mt-4 h-full">
                        <p className="text-center">
                          You rank <b className="text-primary">#{user?.rank}</b> in our leaderboard
                        </p>
                        <p className="text-center">
                          with a total of <b className="text-citron">{user?.xp}</b> Moontonium
                        </p>
                        <p className="absolute bottom-3/4 left-1/2 z-50 -translate-x-1/2 translate-y-1/2 text-center text-5xl">
                          🪐
                        </p>
                        <div className="absolute bottom-0 left-1/2 z-10 h-3/4 w-4 -translate-x-1/2 bg-payne"></div>
                        <div
                          className={`absolute bottom-0 left-1/2 z-40 w-5 -translate-x-1/2 bg-citron`}
                          style={{ height: rocketHeight + '%' }}
                        >
                          <p className="absolute -top-5 left-1/2 -translate-x-1/2 text-5xl">🚀</p>
                        </div>
                      </div>
                    )
                  } else if (isConnected) {
                    return (
                      <div className="relative mt-4 h-full">
                        <p className="z-50 mb-2 text-center text-5xl">👨🏻‍🚀</p>
                        <p className="text-center">
                          {`You haven't completed any tasks, select one from the list to earn Moontonium`}
                        </p>
                      </div>
                    )
                  } else {
                    return (
                      <div className="relative mt-4 h-full">
                        <p className="z-50 mb-2 text-center text-5xl">👨🏻‍🚀</p>
                        <p className="text-center">Connect your wallet to earn Moontonium</p>
                      </div>
                    )
                  }
                }}
              />
            </Card>
          </div>
          <h1 className="my-10 text-3xl text-offWhite">QUESTS</h1>
          <div className="w-full grid-cols-12 gap-4 md:grid">
            <div className="col-span-9 h-full space-y-4">
              <Card className="w-full !pb-10">
                {/* <Campaign campaignId={3856} displayMode="integrated" /> */}
                <Campaign
                  campaignId={3856}
                  render={(args: RenderArgsType) => {
                    const { isLoading, campaign, openApp } = args

                    if (isLoading) return <div>Loading...</div>
                    return (
                      <div>
                        <div className="mt-2 flex items-center justify-between md:items-end">
                          <h1 className="text-2xl text-primary">{campaign.profile?.name} </h1>
                          <p className="text-offWhite">
                            HODLers: {campaign.participantsCount ? campaign.participantsCount : '0'}
                          </p>
                        </div>
                        <p className="mb-6 text-center text-xs text-offWhite md:text-left">
                          {campaign.profile?.description}
                        </p>
                        {campaign &&
                          campaign?.segments.map(({ id, actions }) => (
                            <Segment key={id} actions={actions} openApp={openApp} />
                          ))}
                      </div>
                    )
                  }}
                />
              </Card>
              <Card className="w-full !pb-10">
                <Campaign
                  campaignId={3858}
                  render={(args: RenderArgsType) => {
                    const { isLoading, campaign, openApp } = args

                    if (isLoading) return <div>Loading...</div>
                    return (
                      <div>
                        <div className="mt-2 flex items-center justify-between md:items-end">
                          <h1 className="text-2xl text-primary">{campaign.profile?.name} </h1>
                          <p className="text-offWhite">
                            HODLers: {campaign.participantsCount ? campaign.participantsCount : '0'}
                          </p>
                        </div>
                        <p className="mb-6 text-center text-xs text-offWhite md:text-left">
                          {campaign.profile?.description}
                        </p>
                        {campaign &&
                          campaign?.segments.map(({ id, actions }) => (
                            <Segment key={id} actions={actions} openApp={openApp} />
                          ))}
                      </div>
                    )
                  }}
                />
              </Card>
            </div>
            <div className="col-span-3 mt-0 hidden h-full md:block">
              <Card className="h-full w-full overflow-y-hidden text-offWhite">
                <CustomConnectButton />
                <Leaderboard
                  campaignId={3857}
                  render={(args: LeaderboardRenderArgsType) => {
                    const { userQuery } = args
                    const user = userQuery.data
                    let rocketHeight = 0
                    if (user && user.xp) {
                      rocketHeight = user?.xp + 5
                    }

                    if (user?.rank !== 0 && isConnected) {
                      return (
                        <div className="relative mt-4 h-full">
                          <p className="text-center">
                            You rank <b className="text-primary">#{user?.rank}</b> in our leaderboard
                          </p>
                          <p className="text-center">
                            with a total of <b className="text-citron">{user?.xp}</b> Moontonium
                          </p>
                          <p className="absolute bottom-3/4 left-1/2 z-50 -translate-x-1/2 translate-y-1/2 text-center text-5xl">
                            🪐
                          </p>
                          <div className="absolute bottom-0 left-1/2 z-10 h-3/4 w-4 -translate-x-1/2 bg-payne"></div>
                          <div
                            className={`absolute bottom-0 left-1/2 z-40 w-5 -translate-x-1/2 bg-citron`}
                            style={{ height: rocketHeight + '%' }}
                          >
                            <p className="absolute -top-5 left-1/2 -translate-x-1/2 text-5xl">🚀</p>
                          </div>
                        </div>
                      )
                    } else if (isConnected) {
                      return (
                        <div className="relative mt-4 h-full">
                          <p className="z-50 mb-2 text-center text-5xl">👨🏻‍🚀</p>
                          <p className="text-center">
                            {`You haven't completed any tasks, select one from the list to earn Moontonium`}
                          </p>
                        </div>
                      )
                    } else {
                      return (
                        <div className="relative mt-4 h-full">
                          <p className="z-50 mb-2 text-center text-5xl">👨🏻‍🚀</p>
                          <p className="text-center">Connect your wallet to earn Moontonium</p>
                        </div>
                      )
                    }
                  }}
                />
              </Card>
            </div>
          </div>
          <h2 className="my-10 text-3xl text-offWhite">LEADERBOARD</h2>
          <Card className="mt-4 w-full">
            <Leaderboard
              campaignId={3857}
              render={(args: LeaderboardRenderArgsType) => {
                const { leaderboardQuery } = args

                return (
                  <table className="w-full table-fixed">
                    <thead className="border-b px-4">
                      <tr className="text-grey [&_th]:text-center">
                        <th className="pb-2">Rank</th>
                        <th className="pb-2">Wallet</th>
                        <th className="pb-2">XP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboardQuery.data?.pages.flat()[0].leaderboard?.map((user) => (
                        <tr key={user.rank} className="text-white [&_td]:text-center">
                          <td className="pt-2">{user.rank}</td>
                          <td className="pt-2">{shortenAddress(user.walletAddress)}</td>
                          <td className="pt-2">{user.xp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              }}
            />
          </Card>
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

import type { LeaderboardRenderArgsType } from '@bandit-network/react'
import { Leaderboard } from '@bandit-network/react'

import React from 'react'

import { useAccount } from 'wagmi'

import Card from '@/components/common/Card'
import CustomConnectButton from '@/components/common/CustomConnectButton'

const MAX_XP = 210 // Define the maximum XP corresponding to 100%

const UserCard = ({ campaignId }: { campaignId: number }) => {
  const { isConnected } = useAccount()
  return (
    <Card className={`h-full w-full overflow-y-hidden text-offWhite`}>
      <CustomConnectButton />
      <Leaderboard
        campaignId={campaignId}
        render={(args: LeaderboardRenderArgsType) => {
          const { userQuery } = args
          const user = userQuery.data

          let rocketHeight = 0
          if (user && user.xp) {
            rocketHeight = Math.min((user.xp / MAX_XP) * 100, 100) // Normalize XP to 100% and cap at 100%
          }

          if ((user?.rank !== 0 || user?.rank == null) && isConnected) {
            return (
              <div className="relative mt-4 h-full">
                <p className="text-center">
                  You rank <b className="text-primary">#{user?.rank}</b> in our leaderboard
                </p>
                <p className="text-center">
                  with a total of <b className="text-citron">{user?.xp}</b> Moontonium
                </p>
                <p className="absolute bottom-[66%] left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 text-center text-5xl">
                  🪐
                </p>
                <div className="absolute bottom-9 left-1/2 z-10 h-4/6 w-4 -translate-x-1/2 bg-payne"></div>
                <div
                  className={`absolute bottom-9 left-1/2 z-40 w-5 -translate-x-1/2 bg-citron`}
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
  )
}

export default UserCard

import type { LeaderboardRenderArgsType } from '@bandit-network/react'
import { Leaderboard } from '@bandit-network/react'

import React from 'react'

import { useAccount } from 'wagmi'

import Card from '@/components/common/Card'

const UserCard = ({ campaignId }: { campaignId: number }) => {
  const { isConnected } = useAccount()
  return (
    <Card className={`h-full w-full overflow-y-hidden text-offWhite`}>
      <Leaderboard
        campaignId={campaignId}
        render={(args: LeaderboardRenderArgsType) => {
          const { userQuery } = args
          const user = userQuery.data

          if ((user?.rank !== 0 || user?.rank == null) && isConnected) {
            return (
              <div className="relative mt-4 h-full">
                <p className="text-center">
                  You rank <b className="text-primary">#{user?.rank}</b> in our leaderboard
                </p>
                <p className="text-center">
                  with a total of <b className="text-citron">{user?.xp}</b> Moontonium
                </p>
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

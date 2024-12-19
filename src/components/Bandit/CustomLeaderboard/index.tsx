import type { LeaderboardRenderArgsType } from '@bandit-network/react'
import { Leaderboard } from '@bandit-network/react'

import React from 'react'

import Card from '@/components/common/Card'
import { shortenAddress } from '@/utils/formatters'

const CustomLeaderboard = ({ campaignId }: { campaignId: number }) => {
  return (
    <Card className="mt-4 w-full">
      <Leaderboard
        campaignId={campaignId}
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
  )
}

export default CustomLeaderboard

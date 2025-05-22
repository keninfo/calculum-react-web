/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC } from 'react'

import { shortenAddress } from '@/utils/formatters'

interface MarketTransactionMobileCardProps {
  log: any // TODO: Define type
}

const MarketTransactionMobileCard: FC<MarketTransactionMobileCardProps> = ({ log }) => (
  <div className="rounded-lg border border-grey p-4 shadow-md">
    <div className="flex items-end justify-between">
      <span className="font-bold text-white">{log.type}</span>
      <span className="text-sm text-grey">{log.date}</span>
    </div>
    <div className="mt-2 flex justify-between">
      <span className="text-sm font-medium">Shares:</span>
      <span className={log.type === 'Withdraw' ? 'text-fire' : 'text-spring'}>
        {log.type === 'Withdraw' ? '- ' : ''}
        {log.shares}
      </span>
    </div>
    <div className="mt-1 flex justify-between">
      <span className="text-sm font-medium">USDC:</span>
      <span>
        {log.type === 'Withdraw' ? '- ' : ''}
        {log.usdc}
      </span>
    </div>
    <div className="mt-1 flex justify-between">
      <span className="text-sm font-medium">Wallet:</span>
      <span className="text-robin">{shortenAddress(log.wallet)}</span>
    </div>
  </div>
)

export default MarketTransactionMobileCard

/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC } from 'react'

import { shortenAddress } from '@/utils/formatters'

interface MarketTransactionDesktopTableProps {
  transactions: any[] // TODO: Define type
}

const MarketTransactionDesktopTable: FC<MarketTransactionDesktopTableProps> = ({ transactions }) => (
  <table className="w-full min-w-[600px] border-collapse">
    <thead>
      <tr>
        <th className="border-b-2 border-grey px-4 py-2 text-left font-normal text-grey">Date</th>
        <th className="border-b-2 border-grey px-4 py-2 text-left font-normal text-grey">Type</th>
        <th className="border-b-2 border-grey px-4 py-2 text-right font-normal text-grey">Shares</th>
        <th className="border-b-2 border-grey px-4 py-2 text-right font-normal text-grey">USDC</th>
        <th className="border-b-2 border-grey px-4 py-2 text-right font-normal text-grey">Wallet</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map((log, index) => (
        <tr key={index}>
          <td className="border-b border-grey px-4 py-2">{log?.date}</td>
          <td className="border-b border-grey px-4 py-2">{log?.type}</td>
          <td
            className={`border-b border-grey px-4 py-2 text-right ${log.type === 'Deposit' ? 'text-spring' : 'text-fire'}`}
          >
            {log?.type === 'Withdraw' ? '- ' : ''}
            {log?.shares}
          </td>
          <td className="border-b border-grey px-4 py-2 text-right">
            {log?.type === 'Withdraw' ? '- ' : ''}
            {log?.usdc}
          </td>
          <td className="cursor-pointer border-b border-grey px-4 py-2 text-right text-payne">
            {shortenAddress(log?.wallet)}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default MarketTransactionDesktopTable

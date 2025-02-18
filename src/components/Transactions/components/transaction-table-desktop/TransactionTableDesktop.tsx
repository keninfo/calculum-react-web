/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC } from 'react'

import Link from 'next/link'

import { shortenAddress } from '@/utils/formatters'

interface TransactionTableDesktopProps {
  transactions: any[]
}

const TransactionTableDesktop: FC<TransactionTableDesktopProps> = ({ transactions }) => (
  <table className="w-full min-w-[600px] border-collapse">
    <thead>
      <tr>
        <th className="border-b-2 border-grey px-4 py-2 text-left font-normal text-grey">Date</th>
        <th className="border-b-2 border-grey px-4 py-2 text-left font-normal text-grey">Type</th>
        <th className="border-b-2 border-grey px-4 py-2 text-right font-normal text-grey">Shares</th>
        <th className="border-b-2 border-grey px-4 py-2 text-right font-normal text-grey">USDC</th>
        <th className="border-b-2 border-grey px-4 py-2 text-right font-normal text-grey">Transaction Details</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map((log, index) => (
        <tr key={index}>
          <td className="border-b border-grey px-4 py-2">{log.date}</td>
          <td className="border-b border-grey px-4 py-2">{log.type}</td>
          <td
            className={`border-b border-grey px-4 py-2 text-right ${log.type === 'Deposit' ? 'text-spring' : 'text-fire'}`}
          >
            {log.type === 'Withdraw' ? '- ' : ''}
            {log.shares}
          </td>
          <td className="border-b border-grey px-4 py-2 text-right">
            {log.type === 'Withdraw' ? '- ' : ''}
            {log.usdc}
          </td>
          <td className="cursor-pointer border-b border-grey px-4 py-2 text-right text-robin underline">
            <Link href={`https://sepolia.arbiscan.io/tx/${log.transactionHash}`} target="_blank">
              {shortenAddress(log.transactionHash)}
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default TransactionTableDesktop

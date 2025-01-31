/* eslint-disable @typescript-eslint/no-explicit-any */
import { arbitrumSepolia } from '@wagmi/core/chains'

import React, { useState, useEffect, useCallback } from 'react'

import type { Hash } from 'viem'
import { createPublicClient, http, parseAbiItem } from 'viem'

import useContract from '@/hooks/useContract'
import { formatBalance, formatShares, shortenAddress, timeToWordDate } from '@/utils/formatters'

const ITEMS_PER_PAGE = 10

const MarketTransactions = () => {
  const [transactions, setTransactions] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState<boolean>(true)
  const { contractAddress } = useContract()

  const fetchLogs = useCallback(async () => {
    setCurrentPage(1)
    try {
      const client = createPublicClient({
        chain: arbitrumSepolia,
        transport: http(),
      })

      const eventAbiPendingWithdraw = parseAbiItem(
        `event PendingWithdraw(address indexed receiver,address indexed owner,uint256 assets,uint256 estimationOfShares)`,
      )
      const eventAbiPendingDeposit = parseAbiItem(
        `event PendingDeposit(address indexed caller,address indexed receiver,uint256 assets,uint256 estimationOfShares)`,
      )

      const [getWithdraws, getDeposits] = await Promise.all([
        client.getLogs({
          address: contractAddress as Hash,
          fromBlock: 'earliest',
          toBlock: 'latest',
          event: eventAbiPendingWithdraw,
        }),
        client.getLogs({
          address: contractAddress as Hash,
          fromBlock: 'earliest',
          toBlock: 'latest',
          event: eventAbiPendingDeposit,
        }),
      ])

      const blockNumbers = [...getWithdraws.map((log) => log.blockNumber), ...getDeposits.map((log) => log.blockNumber)]
      const uniqueBlockNumbers = [...new Set(blockNumbers)]
      const blockData = await Promise.all(uniqueBlockNumbers.map((blockNumber) => client.getBlock({ blockNumber })))
      const blockTimestamps = new Map(
        blockData.map((block) => [block.number, timeToWordDate(block.timestamp.toString())]),
      )

      const formattedLogs = [
        ...getWithdraws.map((log) => ({
          block: log.blockNumber,
          date: blockTimestamps.get(log.blockNumber) || 'Unknown',
          type: 'Withdraw',
          wallet: log.args.receiver,
          usdc: parseInt(formatBalance(log.args.assets as bigint)).toLocaleString(),
          shares: parseInt(formatShares(log.args.estimationOfShares as bigint)).toLocaleString(),
          transactionHash: log.transactionHash,
        })),
        ...getDeposits.map((log) => ({
          block: log.blockNumber,
          date: blockTimestamps.get(log.blockNumber) || 'Unknown',
          type: 'Deposit',
          wallet: log.args.caller,
          usdc: parseInt(formatShares(log.args.estimationOfShares as bigint)).toLocaleString(),
          shares: parseInt(formatBalance(log.args.assets as bigint)).toLocaleString(),
          transactionHash: log.transactionHash,
        })),
      ]

      setTransactions(formattedLogs.sort((a, b) => Number(b.block) - Number(a.block)))
      setLoading(false)
    } catch (error) {
      console.error('Error fetching logs:', error)
    }
  }, [contractAddress])

  useEffect(() => {
    fetchLogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE)
  const currentTransactions = transactions.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  if (loading) {
    return <p className="mt-4 text-center">Loading...</p>
  }

  return (
    <div className="h-full w-full">
      <div className="w-full">
        <div className="block overflow-x-auto">
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
              {currentTransactions.map((log, index) => (
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
                  <td className="cursor-pointer border-b border-grey px-4 py-2 text-right text-payne">
                    {shortenAddress(log.wallet)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {transactions.length === 0 && <div className="py-4 text-center text-grey">No transactions found.</div>}
          <div className="mt-4 flex justify-between">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-4 py-2 hover:text-primary disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 hover:text-primary disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketTransactions

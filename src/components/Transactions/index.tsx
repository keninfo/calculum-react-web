/* eslint-disable @typescript-eslint/no-explicit-any */
import { arbitrumSepolia } from '@wagmi/core/chains'

import React, { useState, useEffect } from 'react'

import Link from 'next/link'

import type { Hash } from 'viem'
import { createPublicClient, http, parseAbiItem } from 'viem'

import { useAccount } from 'wagmi'

import Card from '@/components/common/Card'
import useContract from '@/hooks/useContract'
import { useProStore } from '@/store/useProStore'
import { useStrategyStore } from '@/store/useStrategyStore'
import { formatBalance, formatShares, shortenAddress, timeToWordDate } from '@/utils/formatters'

const Transactions = () => {
  const { isConnected, address } = useAccount()
  const [transactions, setTransactions] = useState<any[]>([])
  const { contractAddress } = useContract()
  const { coin } = useStrategyStore()

  const { pro } = useProStore()

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const client = createPublicClient({
          chain: arbitrumSepolia,
          transport: http(),
        })

        const eventAbiWithdraw = parseAbiItem(
          `event Withdraw(address indexed caller,address indexed receiver,address indexed owner,uint256 assets,uint256 shares)`,
        )
        const eventAbiPendingWithdraw = parseAbiItem(
          `event PendingWithdraw(address indexed receiver,address indexed owner,uint256 assets,uint256 estimationOfShares)`,
        )
        const eventAbiDeposit = parseAbiItem(
          `event Deposit(address indexed caller,address indexed owner,uint256 totalAssets,uint256 shares)`,
        )
        const eventAbiPendingDeposit = parseAbiItem(
          `event PendingDeposit(address indexed caller,address indexed receiver,uint256 assets,uint256 estimationOfShares)`,
        )

        const [getWithdraws, getPendingWithdraws, getDeposits, getPendingDeposits] = await Promise.all([
          client.getLogs({
            address: contractAddress as Hash,
            fromBlock: 'earliest',
            toBlock: 'latest',
            event: eventAbiWithdraw,
            args: { caller: address },
          }),
          client.getLogs({
            address: contractAddress as Hash,
            fromBlock: 'earliest',
            toBlock: 'latest',
            event: eventAbiPendingWithdraw,
            args: { receiver: address },
          }),
          client.getLogs({
            address: contractAddress as Hash,
            fromBlock: 'earliest',
            toBlock: 'latest',
            event: eventAbiDeposit,
            args: { caller: address },
          }),
          client.getLogs({
            address: contractAddress as Hash,
            fromBlock: 'earliest',
            toBlock: 'latest',
            event: eventAbiPendingDeposit,
            args: { receiver: address },
          }),
        ])

        const blockNumbers = [
          ...getWithdraws.map((log) => log.blockNumber),
          ...getPendingWithdraws.map((log) => log.blockNumber),
          ...getDeposits.map((log) => log.blockNumber),
          ...getPendingDeposits.map((log) => log.blockNumber),
        ]

        // Fetch the block data to get the timestamp
        const blocks = await Promise.all(blockNumbers.map((blockNumber) => client.getBlock({ blockNumber })))

        let formattedLogs = []

        if (pro) {
          formattedLogs = [
            ...getWithdraws.map((log, index) => ({
              block: log.blockNumber.toString(),
              date: timeToWordDate(blocks[index].timestamp.toString()),
              type: 'Claimed USDC',
              usdc: formatBalance(log.args.shares as bigint),
              smoothcoins: formatShares(log.args.assets as bigint),
              transactionHash: log.transactionHash,
              blockNumber: log.blockNumber,
            })),
            ...getPendingWithdraws.map((log, index) => ({
              block: log.blockNumber.toString(),
              date: timeToWordDate(blocks[index].timestamp.toString()),
              type: 'Withdraw',
              usdc: formatBalance(log.args.assets as bigint),
              smoothcoins: formatShares(log.args.estimationOfShares as bigint),
              transactionHash: log.transactionHash,
              blockNumber: log.blockNumber,
            })),
            ...getDeposits.map((log, index) => ({
              block: log.blockNumber.toString(),
              date: timeToWordDate(blocks[index].timestamp.toString()),
              type: 'Claimed Shares',
              usdc: formatBalance(log.args.totalAssets as bigint),
              smoothcoins: formatShares(log.args.shares as bigint),
              transactionHash: log.transactionHash,
              blockNumber: log.blockNumber,
            })),
            ...getPendingDeposits.map((log, index) => ({
              block: log.blockNumber.toString(),
              date: timeToWordDate(blocks[index].timestamp.toString()),
              type: 'Deposit',
              usdc: formatBalance(log.args.assets as bigint),
              smoothcoins: formatShares(log.args.estimationOfShares as bigint),
              transactionHash: log.transactionHash,
              blockNumber: log.blockNumber,
            })),
          ]
        } else {
          formattedLogs = [
            ...getPendingWithdraws.map((log, index) => ({
              block: log.blockNumber.toString(),
              date: timeToWordDate(blocks[index].timestamp.toString()),
              type: 'Withdraw',
              usdc: formatBalance(log.args.assets as bigint),
              smoothcoins: formatShares(log.args.estimationOfShares as bigint),
              transactionHash: log.transactionHash,
              blockNumber: log.blockNumber,
            })),
            ...getPendingDeposits.map((log, index) => ({
              block: log.blockNumber.toString(),
              date: timeToWordDate(blocks[index].timestamp.toString()),
              type: 'Deposit',
              usdc: formatBalance(log.args.assets as bigint),
              smoothcoins: formatShares(log.args.estimationOfShares as bigint),
              transactionHash: log.transactionHash,
              blockNumber: log.blockNumber,
            })),
          ]
        }

        const sortedLogs = formattedLogs.sort((a, b) => Number(b.block) - Number(a.block))

        setTransactions(sortedLogs)
      } catch (error) {
        console.error('Error fetching logs:', error)
      }
    }

    if (isConnected && address) {
      fetchLogs()
    }
  }, [isConnected, address, pro, contractAddress])

  if (coin == 'BTC') {
    return (
      <Card className="min-h-0 w-full grow" title="Transaction History">
        {isConnected ? (
          <div className="w-full">
            {transactions.length === 0 ? (
              <p className="mb-5 text-center text-lg text-burnt md:text-left">You currently have no transactions.</p>
            ) : (
              <div className="md:my-4">
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full min-w-[600px] border-collapse">
                    <thead>
                      <tr>
                        <th className="border-b-2 border-grey px-4 py-2 text-left font-normal text-grey">Date</th>
                        <th className="border-b-2 border-grey px-4 py-2 text-left font-normal text-grey">Type</th>
                        <th className="border-b-2 border-grey px-4 py-2 text-right font-normal text-grey">USDc</th>
                        <th className="border-b-2 border-grey px-4 py-2 text-right font-normal text-grey">scUSDc</th>
                        <th className="border-b-2 border-grey px-4 py-2 text-right font-normal text-grey">
                          Transaction Details
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((log, index) => (
                        <tr key={index}>
                          <td className="border-b border-grey px-4 py-2">{log.date}</td>
                          <td className="border-b border-grey px-4 py-2">{log.type}</td>
                          <td className="border-b border-grey px-4 py-2 text-right">
                            {log.type == 'Withdraw' || log.type == 'Claimed USDC' ? '- ' : ''}
                            {log.usdc}
                          </td>
                          <td className="border-b border-grey px-4 py-2 text-right">
                            {' '}
                            {log.type == 'Withdraw' || log.type == 'Claimed USDC' ? '- ' : ''}
                            {log.smoothcoins}
                          </td>
                          <td className="cursor-pointer border-b border-grey px-4 py-2 text-right hover:text-primary">
                            <Link href={`https://sepolia.arbiscan.io/tx/${log.transactionHash}`} target="_blank">
                              {shortenAddress(log.transactionHash)}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile */}
                <div className="block md:hidden">
                  {transactions.map((log, index) => (
                    <div key={index} className="mb-4 rounded-lg border-2 border-payne px-4 py-4">
                      <p className="text-center text-sm">
                        <span className="font-bold text-primary">Date:</span> {log.date}
                      </p>
                      <p className="text-center text-sm">
                        <span className="font-bold text-primary">Type:</span> {log.type}
                      </p>
                      <p className="text-center text-sm">
                        <span className="font-bold text-primary">USDC:</span> {log.usdc}
                      </p>
                      <p className="text-center text-sm">
                        <span className="font-bold text-primary">Smoothcoins:</span> {log.smoothcoins}
                      </p>
                      <p className="text-center text-sm">
                        <span className="font-bold text-primary">Transaction:</span>
                        <Link href={`https://sepolia.arbiscan.io/tx/${log.transactionHash}`} target="_blank">
                          {shortenAddress(log.transactionHash)}
                        </Link>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-lg text-grey md:text-left">Connect a wallet to see your transactions</p>
        )}
      </Card>
    )
  }
}

export default Transactions

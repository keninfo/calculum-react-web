/* eslint-disable @typescript-eslint/no-explicit-any */
import { arbitrumSepolia } from '@wagmi/core/chains'

import React, { useState, useEffect, useContext } from 'react'

import Link from 'next/link'

import type { Hash } from 'viem'
import { createPublicClient, http, parseAbiItem } from 'viem'

import { useAccount } from 'wagmi'

import Card from '@/components/common/Card'
import { OptionsContext } from '@/contexts/OptionsContext'
import { ProContext } from '@/contexts/ProContext'
import { contractSmoothcoinBTC } from '@/contracts/smoothcoinBTC'
import { formatBalance, formatShares, shortenAddress, timeToWordDate } from '@/utils/formatters'

const Transactions = () => {
  const { isConnected, address } = useAccount()
  const [transactions, setTransactions] = useState<any[]>([])
  const { pro } = useContext(ProContext)
  const { transactionPending, setTransactionPending } = useContext(OptionsContext)

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
            address: contractSmoothcoinBTC.address as Hash,
            fromBlock: 'earliest',
            toBlock: 'latest',
            event: eventAbiWithdraw,
            args: { caller: address },
          }),
          client.getLogs({
            address: contractSmoothcoinBTC.address as Hash,
            fromBlock: 'earliest',
            toBlock: 'latest',
            event: eventAbiPendingWithdraw,
            args: { receiver: address },
          }),
          client.getLogs({
            address: contractSmoothcoinBTC.address as Hash,
            fromBlock: 'earliest',
            toBlock: 'latest',
            event: eventAbiDeposit,
            args: { caller: address },
          }),
          client.getLogs({
            address: contractSmoothcoinBTC.address as Hash,
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
              type: 'Claimed Smoothcoins',
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
    setTransactionPending(false)
  }, [isConnected, address, pro, transactionPending, setTransactionPending])

  return (
    <Card className="min-h-0 w-full grow" title="TRANSACTION HISTORY">
      {isConnected ? (
        <div className="w-full md:mt-[4vh]">
          {transactions.length === 0 ? (
            <p className="mb-5 text-center text-2xl text-[#4D70C2]">You currently have no transactions.</p>
          ) : (
            <div className="md:my-4">
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[600px] border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b-2 border-greySmoke px-4 py-2 text-left text-[#4D70C2]">Date</th>
                      <th className="border-b-2 border-greySmoke px-4 py-2 text-left text-[#4D70C2]">Type</th>
                      <th className="border-b-2 border-greySmoke px-4 py-2 text-right text-[#4D70C2]">USDc</th>
                      <th className="border-b-2 border-greySmoke px-4 py-2 text-right text-[#4D70C2]">scUSDc</th>
                      <th className="border-b-2 border-greySmoke px-4 py-2 text-right text-[#4D70C2]">
                        Transaction Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((log, index) => (
                      <tr key={index}>
                        <td className="border-b border-greySmoke px-4 py-2">{log.date}</td>
                        <td className="border-b border-greySmoke px-4 py-2">{log.type}</td>
                        <td className="border-b border-greySmoke px-4 py-2 text-right">{log.usdc}</td>
                        <td className="border-b border-greySmoke px-4 py-2 text-right">{log.smoothcoins}</td>
                        <td className="cursor-pointer border-b border-greySmoke px-4 py-2 text-right hover:text-carmesi">
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
                  <div key={index} className="mb-4 rounded-lg border-2 border-[#535E73] px-4 py-4">
                    <p className="text-center text-sm">
                      <span className="font-bold text-carmesi">Date:</span> {log.date}
                    </p>
                    <p className="text-center text-sm">
                      <span className="font-bold text-carmesi">Type:</span> {log.type}
                    </p>
                    <p className="text-center text-sm">
                      <span className="font-bold text-carmesi">USDC:</span> {log.usdc}
                    </p>
                    <p className="text-center text-sm">
                      <span className="font-bold text-carmesi">Smoothcoins:</span> {log.smoothcoins}
                    </p>
                    <p className="text-center text-sm">
                      <span className="font-bold text-carmesi">Transaction:</span>
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
        <div className="flex items-center justify-center">
          <div className="mt-[2vh] space-y-4 text-center">
            <p className="my-[4vh] text-center text-2xl text-[#DF7153]">Connect a wallet to see your transactions</p>
          </div>
        </div>
      )}
    </Card>
  )
}

export default Transactions

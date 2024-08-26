/* eslint-disable @typescript-eslint/no-explicit-any */
import { arbitrumSepolia } from '@wagmi/core/chains'

import React, { useState, useEffect, useContext } from 'react'

import Link from 'next/link'

import type { Hash } from 'viem'
import { createPublicClient, http, parseAbiItem } from 'viem'

import { useAccount } from 'wagmi'

import { calculumVaultContract } from '@/contracts/calculumVault'
import { formatBalance, formatShares, shortenAddress, timeToWordDate } from '@/utils/formatters'

import { ProContext } from '../AppProviders'
import Card from '../common/Card'

const Transactions = () => {
  const { isConnected, address } = useAccount()
  const [transactions, setTransactions] = useState<any[]>([])
  const { pro } = useContext(ProContext)

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
            address: calculumVaultContract.address as Hash,
            fromBlock: 'earliest',
            toBlock: 'latest',
            event: eventAbiWithdraw,
            args: { caller: address },
          }),
          client.getLogs({
            address: calculumVaultContract.address as Hash,
            fromBlock: 'earliest',
            toBlock: 'latest',
            event: eventAbiPendingWithdraw,
            args: { receiver: address },
          }),
          client.getLogs({
            address: calculumVaultContract.address as Hash,
            fromBlock: 'earliest',
            toBlock: 'latest',
            event: eventAbiDeposit,
            args: { caller: address },
          }),
          client.getLogs({
            address: calculumVaultContract.address as Hash,
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
  }, [isConnected, address, pro])

  return (
    <Card className="w-full mt-[2vh] grow min-h-0" title="TRANSACTION HISTORY">
      {isConnected ? (
        <div className="mt-[4vh]">
          {transactions.length === 0 ? (
            <p className="text-left text-2xl">You currently have no transactions.</p>
          ) : (
            <div className="mt-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border-b-2 border-greySmoke px-4 py-2 text-left text-carmesi">Date</th>
                    <th className="border-b-2 border-greySmoke px-4 py-2 text-left text-carmesi">Type</th>
                    <th className="border-b-2 border-greySmoke px-4 py-2 text-right text-carmesi">USDC</th>
                    <th className="border-b-2 border-greySmoke px-4 py-2 text-right text-carmesi">Smoothcoins</th>
                    <th className="border-b-2 border-greySmoke px-4 py-2 text-right text-carmesi">
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
                      <td className="border-b border-greySmoke px-4 py-2 text-right cursor-pointer hover:text-carmesi">
                        <Link href={`https://sepolia.arbiscan.io/tx/${log.transactionHash}`} target="_blank">
                          {shortenAddress(log.transactionHash)}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="space-y-4 mt-[2vh] text-center">
            <p className="text-2xl text-carmesi my-[4vh]">Connect a wallet to see your transactions</p>
          </div>
        </div>
      )}
    </Card>
  )
}

export default Transactions

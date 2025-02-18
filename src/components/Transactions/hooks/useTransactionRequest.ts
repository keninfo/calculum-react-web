/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react'

import { parseAbiItem, type Hash } from 'viem'

import { useAccount } from 'wagmi'

import { publicClient } from '@/config/viem-client'
import useContract from '@/hooks/useContract'
import { formatBalance, formatShares } from '@/utils/formatters'

interface TransactionRequest {
  fetchLogs: () => void
  isLoading: boolean
  transactions: any[]
}

const useTransactionRequest = (): TransactionRequest => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [transactions, setTransactions] = useState<any[]>([]) // TODO: Define type

  const { contractAddress } = useContract()
  const { address } = useAccount()

  const fetchLogs = useCallback(async () => {
    try {
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
        publicClient.getLogs({
          address: contractAddress as Hash,
          fromBlock: 'earliest',
          toBlock: 'latest',
          event: eventAbiWithdraw,
          args: { caller: address },
        }),
        publicClient.getLogs({
          address: contractAddress as Hash,
          fromBlock: 'earliest',
          toBlock: 'latest',
          event: eventAbiPendingWithdraw,
          args: { receiver: address },
        }),
        publicClient.getLogs({
          address: contractAddress as Hash,
          fromBlock: 'earliest',
          toBlock: 'latest',
          event: eventAbiDeposit,
          args: { caller: address },
        }),
        publicClient.getLogs({
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
      const uniqueBlockNumbers = [...new Set(blockNumbers)]
      const blockData = await Promise.all(
        uniqueBlockNumbers.map((blockNumber) => publicClient.getBlock({ blockNumber })),
      )
      const blockTimestamps = new Map(
        blockData.map((block) => [
          block.number,
          new Date(Number(block.timestamp.toString()) * 1000).toLocaleDateString('en-US'),
        ]),
      )

      // TODO: Extract this logic to a helper function
      const formattedLogs = [
        ...getPendingWithdraws.map((log) => ({
          block: log.blockNumber,
          date: blockTimestamps.get(log.blockNumber) || 'Unknown',
          type: 'Withdraw',
          wallet: log.args.receiver,
          usdc: parseInt(formatBalance(log.args.assets as bigint)).toLocaleString(),
          shares: parseInt(formatShares(log.args.estimationOfShares as bigint)).toLocaleString(),
          transactionHash: log.transactionHash,
        })),
        ...getWithdraws.map((log) => ({
          block: log.blockNumber.toString(),
          date: blockTimestamps.get(log.blockNumber) || 'Unknown',
          type: 'Claimed USDC',
          usdc: parseInt(formatBalance(log.args.shares as bigint)).toLocaleString(),
          smoothcoins: parseInt(formatShares(log.args.assets as bigint)).toLocaleString(),
          transactionHash: log.transactionHash,
          blockNumber: log.blockNumber,
        })),
        ...getPendingDeposits.map((log) => ({
          block: log.blockNumber,
          date: blockTimestamps.get(log.blockNumber) || 'Unknown',
          type: 'Deposit',
          wallet: log.args.caller,
          usdc: parseInt(formatShares(log.args.estimationOfShares as bigint)).toLocaleString(),
          shares: parseInt(formatBalance(log.args.assets as bigint)).toLocaleString(),
          transactionHash: log.transactionHash,
        })),
        ...getDeposits.map((log) => ({
          block: log.blockNumber.toString(),
          date: blockTimestamps.get(log.blockNumber) || 'Unknown',
          type: 'Claimed Shares',
          usdc: parseInt(formatBalance(log.args.totalAssets as bigint)).toLocaleString(),
          smoothcoins: parseInt(formatShares(log.args.shares as bigint)).toLocaleString(),
          transactionHash: log.transactionHash,
          blockNumber: log.blockNumber,
        })),
      ]

      setTransactions(formattedLogs.sort((a, b) => Number(b.block) - Number(a.block)))
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching logs:', error)
    }
  }, [contractAddress, address])

  return {
    fetchLogs,
    isLoading,
    transactions,
  }
}
export default useTransactionRequest

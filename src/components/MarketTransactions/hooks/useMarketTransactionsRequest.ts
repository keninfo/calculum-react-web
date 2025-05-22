import { useState, useCallback } from 'react'

import { parseAbiItem, type Hash } from 'viem'

import { publicClient } from '@/config/viem-client'
import useContract from '@/hooks/useContract'
import { formatBalance, formatShares } from '@/utils/formatters'

interface MarketTransaction {
  fetchLogs: () => void
  isLoading: boolean
  transactions: unknown[]
}

const useMarketTransactionsRequest = (): MarketTransaction => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [transactions, setTransactions] = useState<unknown[]>([]) // TODO: Define the type for this state

  const { contractAddress } = useContract()

  const fetchLogs = useCallback(async () => {
    setIsLoading(true)
    try {
      const eventAbiPendingWithdraw = parseAbiItem(
        `event PendingWithdraw(address indexed receiver,address indexed owner,uint256 assets,uint256 estimationOfShares)`,
      )
      const eventAbiPendingDeposit = parseAbiItem(
        `event PendingDeposit(address indexed caller,address indexed receiver,uint256 assets,uint256 estimationOfShares)`,
      )

      const [getWithdraws, getDeposits] = await Promise.all([
        publicClient.getLogs({
          address: contractAddress as Hash,
          fromBlock: 'earliest',
          toBlock: 'latest',
          event: eventAbiPendingWithdraw,
        }),
        publicClient.getLogs({
          address: contractAddress as Hash,
          fromBlock: 'earliest',
          toBlock: 'latest',
          event: eventAbiPendingDeposit,
        }),
      ])

      const blockNumbers = [...getWithdraws, ...getDeposits].map((log) => log.blockNumber)
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
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching logs:', error)
    } finally {
      setIsLoading(false)
    }
  }, [contractAddress])

  return {
    fetchLogs,
    isLoading,
    transactions,
  }
}
export default useMarketTransactionsRequest

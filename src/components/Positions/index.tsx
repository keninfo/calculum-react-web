import React, { useEffect, useState } from 'react'

import type { Hash } from 'viem'
import { createPublicClient, parseAbiItem } from 'viem'
import { arbitrumSepolia } from 'viem/chains'

import { http, useAccount } from 'wagmi'

import Card from '@/components/common/Card'
import { contractSmoothcoinBTC } from '@/contracts/smoothcoinBTC'
import useContract from '@/hooks/useContract'
import ContractReads from '@/hooks/useContractReads'
import { formatBalance, formatShares, timeToWordDate } from '@/utils/formatters'

type responseData = [number, bigint, bigint, bigint]
type pendingDeposit = {
  block: string
  date: string
  usdc: string
  smoothcoins: string
  transactionHash: Hash
  epoch: number
}

const Positions = () => {
  const { contractAddress, contractAbi } = useContract()

  const { isConnected, address } = useAccount()
  const { Withdrawals, Deposits, ConvertToAssets, CurrentEpoch, EpochSharePrice, ContractGenesisEpoch } = ContractReads(
    contractAddress,
    contractAbi,
  )
  const [, withdrawnAssets, , withdrawalTotal] = (Withdrawals(address).data || []) as responseData
  const [, depositAssets, , depositTotal] = (Deposits(address).data || []) as responseData
  const [pendingDeposit, setPendingDeposit] = useState<pendingDeposit>()
  const genesisTimestamp = ContractGenesisEpoch().data as number
  const epochLengthInSeconds = 14400 // make it contract read

  useEffect(() => {
    const fetchLastPendingDeposit = async () => {
      try {
        const client = createPublicClient({
          chain: arbitrumSepolia,
          transport: http(),
        })

        const eventAbiPendingDeposit = parseAbiItem(
          `event PendingDeposit(address indexed caller,address indexed receiver,uint256 assets,uint256 estimationOfShares)`,
        )

        const [getPendingDeposits] = await Promise.all([
          client.getLogs({
            address: contractSmoothcoinBTC.address as Hash,
            fromBlock: 'earliest',
            toBlock: 'latest',
            event: eventAbiPendingDeposit,
            args: { receiver: address },
          }),
        ])

        if (getPendingDeposits.length > 0) {
          const latestDepositLog = getPendingDeposits[getPendingDeposits.length - 1]

          const block = await client.getBlock({ blockNumber: latestDepositLog.blockNumber })
          const blockTimestamp = block.timestamp

          const depositEpoch = Math.floor((Number(blockTimestamp) - Number(genesisTimestamp)) / epochLengthInSeconds)

          const formattedLog = {
            block: latestDepositLog.blockNumber.toString(),
            date: timeToWordDate(blockTimestamp.toString()),
            usdc: formatBalance(latestDepositLog.args.assets as bigint),
            smoothcoins: formatShares(latestDepositLog.args.estimationOfShares as bigint),
            transactionHash: latestDepositLog.transactionHash,
            epoch: depositEpoch, // Add the computed epoch here
          }

          setPendingDeposit(formattedLog)
        }
      } catch (error) {
        console.error('Error fetching the last pending deposit:', error)
      }
    }

    if (isConnected && address) {
      fetchLastPendingDeposit()
    }
  }, [isConnected, address, genesisTimestamp])

  const epochNumber = CurrentEpoch().data as bigint

  const daySharePrice = EpochSharePrice(Number(epochNumber) - 1).data as bigint
  const entrySharePrice = EpochSharePrice(pendingDeposit?.epoch || 0).data as bigint

  const [openPositions, setOpenPositions] = useState<number>(0)

  useEffect(() => {
    const finalAmount = parseFloat(formatBalance(depositAssets + depositTotal))
    const finalAmountWithdrawn = parseFloat(formatBalance(withdrawalTotal))
    setOpenPositions(finalAmount - finalAmountWithdrawn)
  }, [depositAssets, depositTotal, withdrawalTotal, withdrawnAssets])

  const convertOpenPositions = ConvertToAssets(openPositions).data as bigint

  if (!address) {
    return null
  }

  const pnl =
    entrySharePrice && daySharePrice
      ? (((Number(daySharePrice) - Number(entrySharePrice)) / Number(entrySharePrice)) * 100).toFixed(2)
      : '0.00'

  return (
    <>
      {openPositions ? (
        <Card title="OPEN POSITIONS" className="min-h-0 w-full grow">
          <p className="flex justify-between">
            <b>Size:</b> {openPositions.toLocaleString('US')} scUSDc
          </p>
          <p className="flex justify-between">
            <b>Collateral:</b> {parseFloat(formatBalance(convertOpenPositions)).toLocaleString('US')} USDc
          </p>
          <p className="flex justify-between">
            <b>Entry:</b> {formatBalance(entrySharePrice)} USDc
          </p>
          <p className="flex justify-between">
            <b>Current:</b> {formatBalance(daySharePrice)} USDc
          </p>
          <p className="mb-10 flex justify-between">
            <b>PNL:</b> {pnl}%
          </p>
        </Card>
      ) : (
        <Card title="OPEN POSITIONS" className="min-h-0 w-full grow">
          <h2 className="mb-[2vh] text-center text-lg text-burnt">You have no open positions</h2>
        </Card>
      )}
    </>
  )
}

export default Positions

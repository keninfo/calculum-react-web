import React, { useEffect, useState } from 'react'

import type { Hash } from 'viem'
import { createPublicClient, parseAbiItem } from 'viem'
import { arbitrumSepolia } from 'viem/chains'

import { http, useAccount } from 'wagmi'

import Card from '@/components/common/Card'
import useContract from '@/hooks/useContract'
import ContractReads from '@/hooks/useContractReads'
import { useStrategyStore } from '@/store/useStrategyStore'
import { formatBalance, formatShares, timeToWordDate } from '@/utils/formatters'

type pendingDeposit = {
  block: string
  date: string
  usdc: string
  smoothcoins: string
  transactionHash: Hash
  epoch: number
}

type responseData = [number, bigint, bigint, bigint]

const Positions = () => {
  const { contractAddress, contractAbi, symbol } = useContract()
  const { coin } = useStrategyStore()

  const { isConnected, address } = useAccount()
  const { ConvertToAssets, CurrentEpoch, EpochSharePrice, ContractGenesisEpoch, Deposits, BalanceShares } =
    ContractReads(contractAddress, contractAbi)
  const [pendingDeposit, setPendingDeposit] = useState<pendingDeposit>()
  const genesisTimestamp = ContractGenesisEpoch().data as number
  const epochLengthInSeconds = 14400 // make it contract read

  const [, , amountShares] = (Deposits(address).data || []) as responseData

  const balanceSharesResult = BalanceShares(address).data as bigint

  let calculatedShares = amountShares

  if (calculatedShares <= 0) {
    calculatedShares = balanceSharesResult
  }

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
            address: contractAddress as Hash,
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
  }, [isConnected, address, genesisTimestamp, contractAddress])

  const epochNumber = CurrentEpoch().data as bigint

  const daySharePrice = EpochSharePrice(Number(epochNumber) - 1).data as bigint
  const entrySharePrice = EpochSharePrice(pendingDeposit?.epoch || 0).data as bigint

  const [openPositions, setOpenPositions] = useState<number>(0)

  useEffect(() => {
    const finalAmount = parseFloat(formatShares(calculatedShares))
    setOpenPositions(finalAmount)
  }, [calculatedShares])

  const convertOpenPositions = ConvertToAssets(openPositions).data as bigint

  if (!address) {
    return null
  }

  const pnl =
    entrySharePrice && daySharePrice
      ? (((Number(daySharePrice) - Number(entrySharePrice)) / Number(entrySharePrice)) * 100).toFixed(2)
      : '0.00'

  if (coin == 'BTC') {
    return (
      <>
        {openPositions ? (
          <Card title="Open Positions" className="min-h-0 w-full grow">
            <p className="flex justify-between">
              <b className="font-normal text-grey">Size:</b> {openPositions.toLocaleString('US')} {symbol}
            </p>
            <p className="flex justify-between">
              <b className="font-normal text-grey">Collateral:</b>{' '}
              {parseFloat(formatBalance(convertOpenPositions)).toLocaleString('US')} USDc
            </p>
            <p className="flex justify-between">
              <b className="font-normal text-grey">Entry:</b> {formatBalance(entrySharePrice)} USDc
            </p>
            <p className="flex justify-between">
              <b className="font-normal text-grey">Current:</b> {formatBalance(daySharePrice)} USDc
            </p>
            <p className="mb-10 flex justify-between">
              <b className="font-normal text-grey">PNL:</b>{' '}
              <b
                className={`${Number(pnl) < 0 ? 'text-fire' : Number(pnl) > 0 ? 'text-spring' : 'text-grey'} font-normal`}
              >
                {pnl}%
              </b>
            </p>
          </Card>
        ) : (
          <Card title="Open Positions" className="min-h-0 w-full grow">
            <h2 className="mb-[2vh] text-center text-lg text-burnt md:text-left">You have no open positions</h2>
          </Card>
        )}
      </>
    )
  }
}

export default Positions

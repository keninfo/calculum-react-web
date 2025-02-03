import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React, { useEffect, useState } from 'react'

import type { Hash } from 'viem'
import { createPublicClient, parseAbiItem } from 'viem'
import { arbitrumSepolia } from 'viem/chains'

import { http, useAccount } from 'wagmi'

import useContract from '@/hooks/useContract'
import ContractReads from '@/hooks/useContractReads'
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

  return (
    <>
      {openPositions ? (
        <div className="h-full w-full">
          <div className="w-full">
            <div className="block overflow-x-auto">
              <table className="mt-4 w-full border-collapse md:w-fit">
                <tbody>
                  <tr>
                    <td className="pr-4">Size</td>
                    <td className="text-right">
                      {openPositions.toLocaleString('US')} {symbol}
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4">Collateral</td>
                    <td className="text-right">
                      {parseFloat(formatBalance(convertOpenPositions)).toLocaleString('US')} USDc
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4">Entry</td>
                    <td className="text-right">{formatBalance(entrySharePrice)} USDc</td>
                  </tr>
                  <tr>
                    <td className="pr-4">Current</td>
                    <td className="text-right">{formatBalance(daySharePrice)} USDc</td>
                  </tr>
                  <tr>
                    <td className="pr-4">PNL</td>
                    <td
                      className={`text-right font-normal ${
                        Number(pnl) < 0 ? 'text-fire' : Number(pnl) > 0 ? 'text-spring' : 'text-grey'
                      }`}
                    >
                      {pnl}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="0 h-full min-h-fit w-full">
          <p className="text-center text-[5vh] text-payne">
            <FontAwesomeIcon icon={['fas', 'ban' as IconName]} />
          </p>
          <h2 className="text-center text-lg text-payne">You have no open positions</h2>
        </div>
      )}
    </>
  )
}

export default Positions

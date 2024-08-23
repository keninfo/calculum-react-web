import React, { useEffect, useState } from 'react'

import { useAccount } from 'wagmi'

import Card from '@/components/common/Card'
import ContractReads from '@/hooks/useContractReads'
import { formatBalance } from '@/utils/formatters'

type responseData = [number, bigint, bigint, bigint]

const Positions = () => {
  const { address } = useAccount()
  const { Withdrawals, Deposits, ConvertToAssets } = ContractReads()
  const [, withdrawnAssets, , withdrawalTotal] = (Withdrawals(address).data || []) as responseData
  const [, depositAssets, , depositTotal] = (Deposits(address).data || []) as responseData

  const [openPositions, setOpenPositions] = useState<number>(0)

  useEffect(() => {
    const finalAmount = parseFloat(formatBalance(depositAssets + depositTotal))
    const finalAmountWithdrawn = parseFloat(formatBalance(withdrawnAssets + withdrawalTotal))
    setOpenPositions(finalAmount - finalAmountWithdrawn)
  }, [depositAssets, depositTotal, withdrawalTotal, withdrawnAssets])

  // Call ConvertToAssets hooks outside of any conditionals
  const convertOpenPositions = ConvertToAssets(openPositions).data as bigint
  const convertSingleAsset = ConvertToAssets(1).data as bigint

  if (!address) {
    return null
  }

  return (
    <>
      {openPositions ? (
        <Card title="OPEN POSITIONS" className="mt-[2vh] w-full grow min-h-0">
          <h2 className="text-left font-bold mb-[2vh] text-carmesi text-lg">BTC Smoothcoins</h2>
          <p className="flex justify-between">
            <b>Size:</b> {openPositions} Smoothcoins
          </p>
          <p className="flex justify-between">
            <b>Collateral:</b> {formatBalance(convertOpenPositions)} USDC
          </p>
          <p className="flex justify-between">
            <b>Entry:</b> {formatBalance(convertSingleAsset)} USDC
          </p>
          <p className="flex justify-between">
            <b>Current:</b> {formatBalance(convertSingleAsset)} USDC
          </p>
          <p className="flex justify-between">
            <b>PNL:</b> {(1 / parseFloat(formatBalance(convertSingleAsset)) - 1).toFixed(6)}%
          </p>
        </Card>
      ) : (
        <Card title="OPEN POSITIONS" className="mt-[2vh] w-full grow min-h-0">
          <h2 className="text-center mb-[2vh]  text-lg">You have no open positions</h2>
        </Card>
      )}
    </>
  )
}

export default Positions

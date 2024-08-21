import React, { useEffect, useState } from 'react'

import { useAccount } from 'wagmi'

import Card from '@/components/common/Card'
import ContractReads from '@/hooks/useContractReads'
import { formatBalance, formatShares } from '@/utils/formatters'

type responseData = [number, bigint, bigint, bigint]

const Positions = () => {
  const { address } = useAccount()
  const { Withdrawals, Deposits, ConvertToAssets } = ContractReads()
  const [, userWithdrawalsAssets] = (Withdrawals(address).data || []) as responseData
  const [, , userDepositsShares] = (Deposits(address).data || []) as responseData
  const [openPositions, setOpenPositions] = useState<number>(0)

  useEffect(() => {
    setOpenPositions(parseFloat(formatShares(userDepositsShares)) - parseFloat(formatBalance(userWithdrawalsAssets)))
  }, [userDepositsShares, userWithdrawalsAssets])

  if (!address) {
    return
  }

  if (openPositions && openPositions <= 0) {
    return (
      <Card title="POSITIONS" className="mt-[2vh] w-full h-fit max-h-full">
        <h2 className="text-center mb-[2vh]  text-lg">You have no open positions</h2>
      </Card>
    )
  }

  return (
    <Card title="POSITIONS" className="mt-[2vh] w-full h-fit max-h-full">
      <h2 className="text-left font-bold mb-[2vh] text-carmesi text-lg">BTC Smoothcoins</h2>
      <p className="flex justify-between">
        <b>Size:</b> {openPositions} Smoothcoins
      </p>
      <p className="flex justify-between">
        <b>Collateral:</b> {formatBalance(ConvertToAssets(openPositions).data as bigint)} USDC
      </p>
      <p className="flex justify-between">
        <b>Entry:</b> 1
      </p>
      <p className="flex justify-between">
        <b>Current:</b> {formatBalance(ConvertToAssets(1).data as bigint)} USDC
      </p>
      <p className="flex justify-between">
        <b>PNL:</b> {(1 / parseFloat(formatBalance(ConvertToAssets(1).data as bigint)) - 1).toFixed(6)}%
      </p>
      <p className="flex justify-between">
        <b>Net Value:</b>
      </p>
    </Card>
  )
}

export default Positions

import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React, { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

import { useAccount } from 'wagmi'

import Card from '@/components/common/Card'
import ContractReads from '@/hooks/useContractReads'

import FaucetComponent from '../FaucetComponent'
import CustomConnectButton from '../common/CustomConnectButton'
import Approve from './Approve'
import ClaimAssets from './ClaimAssets'
import ClaimShares from './ClaimShares'
import Deposit from './Deposit'
import Withdraw from './Withdraw'

type responseData = [number, bigint, bigint, bigint]

const TradeBoxButton = ({ action, type }: { action: string; type: number }) => {
  if (type == 0) {
    return (
      <button
        className="my-2 flex w-full items-center justify-between rounded-md bg-[#343D4F] px-4 py-2 text-center text-[#888E96]"
        disabled
      >
        <div className="h-4 w-4 bg-transparent"></div>
        {action}
        <FontAwesomeIcon icon={['fas', 'check' as IconName]} className="h-4 text-carmesi" />
      </button>
    )
  } else if (type == 1) {
    return (
      <button
        className="my-2 flex w-full items-center justify-center rounded-md bg-[#535E73] px-4 py-2 text-center text-[#888E96]"
        disabled
      >
        {action}
      </button>
    )
  }
}

const TradeBoxActionContainer = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return <div className="my-5 h-fit w-full rounded-lg border-2 border-[#535E73] p-5">{children}</div>
}

const TradeBox = () => {
  const [step, setStep] = useState<number>(0)
  const { address, isConnected } = useAccount()
  const { BalanceAssets, Allowance, Deposits, Withdrawals } = ContractReads()
  const balanceAssets = BalanceAssets(address).data as bigint
  const allowance = Allowance(address).data as bigint
  const [userDepositStatus, , ,] = (Deposits(address).data || []) as responseData
  const [userWithdrawalsStatus, , ,] = (Withdrawals(address).data || []) as responseData

  console.log(userWithdrawalsStatus)
  console.log(userDepositStatus)

  useEffect(() => {
    if (userWithdrawalsStatus == 5) {
      setStep(6)
    } else if (userDepositStatus == 3) {
      setStep(5)
    } else if (userWithdrawalsStatus == 0 && userDepositStatus != 0) {
      setStep(4)
    } else if (userDepositStatus == 1) {
      setStep(4)
    } else if (userDepositStatus == 0 && balanceAssets > 0 && allowance > 0) {
      setStep(3)
    } else if (balanceAssets <= 0) {
      setStep(1)
    } else if (allowance <= 0) {
      setStep(2)
    } else {
      setStep(0)
    }
  }, [balanceAssets, allowance, userDepositStatus, userWithdrawalsStatus])

  return (
    <Card className="h-fit max-h-full w-full">
      <CustomConnectButton />
      {!isConnected && (
        <ul className="mt-5 space-y-2">
          <TradeBoxButton action="Mint" type={1} />
          <TradeBoxButton action="Approve" type={1} />
          <TradeBoxButton action="Deposit" type={1} />
          <TradeBoxButton action="Claim Shares" type={1} />
          <TradeBoxButton action="Withdraw" type={1} />
          <TradeBoxButton action="Claim Assets" type={1} />
        </ul>
      )}
      {isConnected && (
        <ul className="mt-5">
          {step == 1 ? (
            <TradeBoxActionContainer>
              <FaucetComponent />
            </TradeBoxActionContainer>
          ) : (
            <TradeBoxButton action="Mint" type={0} />
          )}
          {step == 2 ? (
            <TradeBoxActionContainer>
              <Approve />
            </TradeBoxActionContainer>
          ) : (
            <TradeBoxButton action="Approve" type={step < 2 ? 1 : 0} />
          )}
          {step == 3 ? (
            <TradeBoxActionContainer>
              <Deposit />
            </TradeBoxActionContainer>
          ) : (
            <TradeBoxButton action="Deposit" type={step < 3 ? 1 : 0} />
          )}
          {step == 4 ? (
            <TradeBoxActionContainer>
              <ClaimShares />
            </TradeBoxActionContainer>
          ) : (
            <TradeBoxButton action="Claim Shares" type={step < 4 ? 1 : 0} />
          )}
          {step == 5 ? (
            <TradeBoxActionContainer>
              <Withdraw />
            </TradeBoxActionContainer>
          ) : (
            <TradeBoxButton action="Withdraw" type={step < 5 ? 1 : 0} />
          )}
          {step == 6 ? (
            <TradeBoxActionContainer>
              <ClaimAssets />
            </TradeBoxActionContainer>
          ) : (
            <TradeBoxButton action="Claim Assets" type={step < 6 ? 1 : 0} />
          )}
        </ul>
      )}
    </Card>
  )
}

export default TradeBox

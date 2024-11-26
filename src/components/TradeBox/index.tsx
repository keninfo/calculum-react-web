import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React, { createContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

import { useAccount } from 'wagmi'
import { arbitrumSepolia } from 'wagmi/chains'

import Card from '@/components/common/Card'
import CustomConnectButton from '@/components/common/CustomConnectButton'
import useContract from '@/hooks/useContract'
import ContractReads from '@/hooks/useContractReads'
import { walletClient } from '@/services/RainbowKitProvider'
import { useStrategyStore } from '@/store/useStrategyStore'

import { PrimaryButton } from '../common/Buttons'
import Approve from './Approve'
import ClaimAssets from './ClaimAssets'
import ClaimShares from './ClaimShares'
import Deposit from './Deposit'
import FaucetComponent from './FaucetComponent'
import Withdraw from './Withdraw'

type responseData = [number, bigint, bigint, bigint]
interface AmountContextType {
  amount: number
  setAmount: React.Dispatch<React.SetStateAction<number>>
}
export const AmountContext = createContext<AmountContextType>({
  amount: 0,
  setAmount: () => {},
})

const TradeBoxButton = ({ action, type }: { action: string; type: number }) => {
  if (type == 0) {
    return (
      <button
        className="my-2 flex w-full items-center justify-between rounded-md bg-payne px-4 py-2 text-center text-grey"
        disabled
      >
        <div className="h-4 w-4 bg-transparent"></div>
        {action}
        <FontAwesomeIcon icon={['fas', 'check' as IconName]} className="h-4 text-primary" />
      </button>
    )
  } else if (type == 1) {
    return (
      <button
        className="my-2 flex w-full items-center justify-center rounded-md bg-payne px-4 py-2 text-center text-grey"
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
  return <div className="my-2 h-fit w-full rounded-lg border-2 border-payne p-5">{children}</div>
}

const TradeBox = () => {
  const { contractAddress, contractAbi } = useContract()

  const [step, setStep] = useState<number>(0)
  const { address, isConnected, chainId } = useAccount()
  const { BalanceAssets, Allowance, Deposits, Withdrawals, BalanceShares } = ContractReads(contractAddress, contractAbi)
  const balanceAssets = BalanceAssets(address).data as bigint
  const balanceSharesResult = BalanceShares(address).data as bigint
  const allowance = Allowance(address).data as bigint
  const [userDepositStatus, , ,] = (Deposits(address).data || []) as responseData
  const [userWithdrawalsStatus, , ,] = (Withdrawals(address).data || []) as responseData
  const [amount, setAmount] = useState<number>(0)
  const [wrongNetwork, setWrongNetwork] = useState<boolean>()
  const { setNetwork } = useStrategyStore()

  const switchNetwork = async () => {
    if (walletClient) {
      console.log('switching')
      const targetChainId = arbitrumSepolia.id
      try {
        await walletClient.switchChain({ id: targetChainId })
      } catch (error) {
        console.error('Error switching chain:', error)
      }
    }
  }

  useEffect(() => {
    if (chainId != arbitrumSepolia.id) {
      setWrongNetwork(true)
    } else {
      setWrongNetwork(false)
      setNetwork('Arbitrum Sepolia')
    }
  }, [chainId, setNetwork])

  useEffect(() => {
    if ((userWithdrawalsStatus == 2 || userWithdrawalsStatus == 5) && userDepositStatus == 3) {
      setStep(6)
    } else if (userDepositStatus == 3 && Number(balanceSharesResult) / 1000000000000000000 > 1) {
      setStep(5)
    } else if (
      (userWithdrawalsStatus == 0 && userDepositStatus != 0) ||
      (userWithdrawalsStatus == 3 && userDepositStatus != 3)
    ) {
      setStep(4)
    } else if (userDepositStatus == 1) {
      setStep(4)
    } else if ((userDepositStatus == 0 || userDepositStatus == 3) && balanceAssets > 0 && allowance > 0) {
      setStep(3)
    } else if (balanceAssets <= 0) {
      setStep(1)
    } else if (allowance <= 0) {
      setStep(2)
    } else {
      setStep(0)
    }
  }, [balanceAssets, allowance, userDepositStatus, userWithdrawalsStatus, balanceSharesResult])

  return (
    <AmountContext.Provider value={{ amount, setAmount }}>
      <Card className="h-fit max-h-full w-full">
        <CustomConnectButton />
        {wrongNetwork && isConnected && (
          <>
            {' '}
            <p className="mt-4 text-center text-fire">Your wallet is connected to an unsupported Network </p>
            <PrimaryButton handleClick={() => switchNetwork()} className="mt-5">
              Switch Network
            </PrimaryButton>
          </>
        )}
        {!isConnected && (
          <ul className="mt-2 space-y-2">
            <TradeBoxButton action="Mint" type={1} />
            <TradeBoxButton action="Approve" type={1} />
            <TradeBoxButton action="Deposit" type={1} />
            <TradeBoxButton action="Claim Shares" type={1} />
            <TradeBoxButton action="Withdraw" type={1} />
            <TradeBoxButton action="Claim Assets" type={1} />
          </ul>
        )}
        {isConnected && !wrongNetwork && (
          <ul className="mt-2">
            {step == 1 ? (
              <TradeBoxActionContainer>
                <FaucetComponent />
              </TradeBoxActionContainer>
            ) : (
              <TradeBoxButton action="Mint" type={step < 1 ? 1 : 0} />
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
    </AmountContext.Provider>
  )
}

export default TradeBox

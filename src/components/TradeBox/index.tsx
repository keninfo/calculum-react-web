import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React, { createContext, useEffect, useState } from 'react'

import { useAccount } from 'wagmi'
import { arbitrumSepolia } from 'wagmi/chains'

import { PrimaryButton, SecondaryButton } from '@/components/common/Buttons'
import Card from '@/components/common/Card'
import useContract from '@/hooks/useContract'
import ContractReads from '@/hooks/useContractReads'
import { walletClient } from '@/services/RainbowKitProvider'
import { useStrategyStore } from '@/store/useStrategyStore'

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

const TradeBox = () => {
  const { contractAddress, contractAbi } = useContract()

  const [step, setStep] = useState<number>(0)
  const { address, isConnected, chainId } = useAccount()
  const { BalanceAssets, Allowance, Deposits, Withdrawals, BalanceShares, InMaintenance } = ContractReads(
    contractAddress,
    contractAbi,
  )
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

  const handleChange = ({ toDeposit }: { toDeposit: boolean }) => {
    if (toDeposit == true) {
      if (
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
    } else {
      if ((userWithdrawalsStatus == 2 || userWithdrawalsStatus == 5) && userDepositStatus == 3) {
        setStep(6)
      } else if (userDepositStatus == 3 && Number(balanceSharesResult) / 1000000000000000000 > 1) {
        setStep(5)
      } else {
        setStep(7)
      }
    }
  }

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

  let isInMaintenance = false
  const data = InMaintenance().data as [boolean, number]
  if (data) {
    isInMaintenance = data[0] as boolean
  }

  return (
    <AmountContext.Provider value={{ amount, setAmount }}>
      <Card className="h-fit w-full">
        <div className="mb-8 grid w-full grid-cols-2 items-center gap-5">
          <SecondaryButton
            className={`col-span-1 w-full pb-4 ${step < 5 ? 'border-b-2 border-robin text-robin' : ''} hover:scale-100`}
            handleClick={() => handleChange({ toDeposit: true })}
          >
            DEPOSIT
          </SecondaryButton>
          <SecondaryButton
            className={`col-span-1 w-full pb-4 ${step >= 5 ? 'border-b-2 border-robin text-robin' : ''} hover:scale-100`}
            handleClick={() => handleChange({ toDeposit: false })}
          >
            WITHDRAW
          </SecondaryButton>
        </div>
        {wrongNetwork && isConnected && (
          <>
            {' '}
            <p className="mt-4 text-center text-fire">Your wallet is connected to an unsupported Network </p>
            <PrimaryButton handleClick={() => switchNetwork()} className="mt-5">
              Switch Network
            </PrimaryButton>
          </>
        )}
        {isConnected && !wrongNetwork && (
          <ul className="mt-2">
            {step == 1 && <FaucetComponent inMaintenance={isInMaintenance} />}
            {step == 2 && <Approve inMaintenance={isInMaintenance} />}
            {step == 3 && <Deposit inMaintenance={isInMaintenance} />}
            {step == 4 && <ClaimShares inMaintenance={isInMaintenance} />}
            {step == 5 && <Withdraw inMaintenance={isInMaintenance} />}
            {step == 6 && <ClaimAssets inMaintenance={isInMaintenance} />}
            {step == 7 && (
              <p className="text-center">
                {`You don't have positions to withdraw, try depositing something first and claiming your shares !`}
              </p>
            )}
          </ul>
        )}
        {isInMaintenance && (
          <div className="mt-4 flex w-full items-center justify-center bg-atomic py-2 text-center font-light text-dark">
            <FontAwesomeIcon icon={['fas', 'triangle-exclamation' as IconName]} className="mr-2 text-xl" />
            <p className="w-2/3 text-xs">Contract under maintenance, please try again in 5 minutes</p>
          </div>
        )}
      </Card>
    </AmountContext.Provider>
  )
}

export default TradeBox

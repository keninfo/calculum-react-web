import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React, { createContext, useEffect, useState } from 'react'

import { base } from 'viem/chains'

import { useAccount } from 'wagmi'

import { PrimaryButton, SecondaryButton } from '@/components/common/Buttons'
import Card from '@/components/common/Card'
import { walletClient } from '@/config/wallet-client'
import useContract from '@/hooks/useContract'
import ContractReads from '@/hooks/useContractReads'
import { useStrategyStore } from '@/store/useStrategyStore'

import Approve from './Approve'
import ClaimAssets from './ClaimAssets'
import ClaimShares from './ClaimShares'
import Deposit from './Deposit'
import FaucetComponent from './FaucetComponent'
import FaucetComponentMantle from './FaucetComponentMantle'
import Withdraw from './Withdraw'
import { VelvetInput } from './velvet-trade-box/components'

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
  const { contractAddress, contractAbi, chainId: currentChain, chain } = useContract()

  const [step, setStep] = useState<number>(0)
  const { address, isConnected, chainId } = useAccount()
  const {
    BalanceAssets,
    BalanceAssetsBase,
    Allowance,
    AllowanceBase,
    Deposits,
    Withdrawals,
    BalanceShares,
    InMaintenance,
    BalanceAssetsMantle,
  } = ContractReads(contractAddress, contractAbi)

  let balanceAssets = BigInt(0)

  if (currentChain == '5003') {
    balanceAssets = BalanceAssetsMantle(address).data as bigint
  } else if (currentChain == '8453') {
    balanceAssets = BalanceAssetsBase(address).data as bigint
  } else {
    balanceAssets = BalanceAssets(address).data as bigint
  }

  const balanceSharesResult = BalanceShares(address).data as bigint
  const [userDepositStatus, , ,] = (Deposits(address).data || []) as responseData
  const [userWithdrawalsStatus, , ,] = (Withdrawals(address).data || []) as responseData
  const allowance =
    Number(currentChain) !== base.id ? (Allowance(address).data as bigint) : (AllowanceBase(address).data as bigint)
  const [amount, setAmount] = useState<number>(0)
  const [wrongNetwork, setWrongNetwork] = useState<boolean>()
  const { setNetwork } = useStrategyStore()

  const switchNetwork = async () => {
    if (walletClient) {
      const targetChain = parseInt(currentChain)
      console.log(targetChain)
      try {
        await walletClient.switchChain({ id: targetChain })
      } catch (error) {
        console.error('Error switching chain:', error)
      }
    }
  }

  useEffect(() => {
    if (chainId != parseInt(currentChain)) {
      setWrongNetwork(true)
    } else {
      setWrongNetwork(false)
      setNetwork(chain)
    }
  }, [chain, chainId, currentChain, setNetwork])

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
  const data = InMaintenance(chainId).data as [boolean, number]
  if (data) {
    isInMaintenance = data[0] as boolean
  }

  return (
    <AmountContext.Provider value={{ amount, setAmount }}>
      <Card className="h-fit w-full bg-[#3B3B3B] md:min-h-[231px]">
        <div className="mb-8 grid w-full grid-cols-2 items-center gap-5">
          <SecondaryButton
            className={`col-span-1 w-full bg-[#3B3B3B] pb-4 ${step < 5 ? 'border-b-2 border-robin text-robin' : ''} `}
            handleClick={() => handleChange({ toDeposit: true })}
            disabled
          >
            DEPOSIT
          </SecondaryButton>
          <SecondaryButton
            className={`col-span-1 w-full bg-[#3B3B3B] pb-4 ${step >= 5 ? 'border-b-2 border-robin text-robin' : ''}`}
            handleClick={() => handleChange({ toDeposit: false })}
            disabled
          >
            WITHDRAW
          </SecondaryButton>
        </div>

        {chain !== 'Coming Soon' && !isConnected && (
          <div className="grid h-28 place-content-center">
            <p className="hidden w-full text-center text-sm text-[#C1EA60] md:block">
              Connect your wallet to get started{' '}
            </p>
          </div>
        )}
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
            <VelvetInput />
            {step == 1 && currentChain !== '5003' && <FaucetComponent inMaintenance={isInMaintenance} />}
            {step == 1 && currentChain === '5003' && <FaucetComponentMantle inMaintenance={isInMaintenance} />}
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

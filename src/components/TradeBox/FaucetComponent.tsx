'use client'

import React, { useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { createPublicClient, createWalletClient, parseUnits, TransactionReceiptNotFoundError, type Hash } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { arbitrumSepolia } from 'viem/chains'

import { http, useAccount, useBalance } from 'wagmi'

import AddUSDC from '@/components/common/AddToken/AddUSDC'
import { AlternateButton, PrimaryButton } from '@/components/common/Buttons'
import Input from '@/components/common/Input'
import useMint from '@/hooks/useMint'
import { PRIVATE_KEY } from '@/utils/constants'
import createTransactionAlert from '@/utils/createTransactionAlert'

import { AmountContext } from './index'

const coins = ['USDC']
const contracts = ['0xD32ea1C76ef1c296F131DD4C5B2A0aac3b22485a']

const FaucetComponent = () => {
  const router = useRouter()
  const { address } = useAccount()
  const { MintTokens, isPending, error, hash } = useMint()
  const { amount, setAmount } = useContext(AmountContext)
  const [selectedCoin] = useState<number>(0)

  const [isSending, setIsSending] = useState(false)
  const [hasRequestedETH, setHasRequestedETH] = useState(false)

  const { data: ethBalanceData, refetch: refetchBalance } = useBalance({
    address,
  })

  const ethBalance = parseFloat(ethBalanceData?.formatted || '0')
  const isEligibleForEth = ethBalance < 0.0005 && !hasRequestedETH

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(event.target.value))
  }

  useEffect(() => {
    if (hash) {
      createTransactionAlert('Tokens Minted', true)
      router.push('/dashboard')
    }
    if (error) {
      createTransactionAlert('Erro: Tokens Not Minted', false)
    }
  }, [hash, error, router])

  const setMax = () => {
    setAmount(selectedCoin <= 1 ? 10000 : 99)
  }

  const handleSendTokens = async () => {
    try {
      setIsSending(true)
      const faucetAccount = privateKeyToAccount(`0x${PRIVATE_KEY}`)
      const faucetClient = createWalletClient({
        chain: arbitrumSepolia,
        transport: http(),
        account: faucetAccount,
      })
      const publicClient = createPublicClient({
        chain: arbitrumSepolia,
        transport: http(),
      })

      const txHash = await faucetClient.sendTransaction({
        account: faucetAccount,
        to: address as Hash,
        value: parseUnits((0.0005 - ethBalance).toString(), 18),
      })

      createTransactionAlert('ETH sent successfully!', true)
      setHasRequestedETH(true)

      let receipt = null
      while (!receipt) {
        try {
          receipt = await publicClient.getTransactionReceipt({ hash: txHash })
        } catch (error) {
          if (!(error instanceof TransactionReceiptNotFoundError)) {
            throw error
          }
        }
        if (!receipt) {
          await new Promise((resolve) => setTimeout(resolve, 2000))
        }
      }

      await refetchBalance()
      createTransactionAlert('Balance updated successfully!', true)

      return txHash
    } catch (err) {
      createTransactionAlert('Failed to send ETH. Please try again.', false)
      throw err
    } finally {
      setIsSending(false)
    }
  }

  const handleMint = async () => {
    if (isEligibleForEth) {
      try {
        await handleSendTokens()
      } catch {
        return
      }
    }
    await MintTokens(contracts[selectedCoin], address as Hash, amount, selectedCoin <= 1 ? 6 : 18)
  }

  return (
    <>
      {!isSending ? (
        <>
          <div className="flex items-center justify-center">
            <span className={`h-3 w-3 rounded-full ${isEligibleForEth ? 'bg-primary' : 'bg-fire'}`} />
            <p className="ml-2 text-offWhite">
              {isEligibleForEth ? 'Eligible to receive ETH' : 'Not eligible to receive ETH'}
            </p>
          </div>{' '}
          <p className="mx-auto text-center text-xs text-grey">Your ETH Balance: {ethBalance.toFixed(6)} ETH</p>
        </>
      ) : (
        <p className="text-center text-primary">Sending Gas Eth...</p>
      )}
      <div className="mt-5">
        <div className="mx-5 flex items-center justify-center border-b-2 border-payne px-2 pb-2">
          <Input
            placeholder="Amount..."
            type="number"
            value={amount}
            handleChange={handleSearch}
            className="border-none text-2xl"
          />
          <AlternateButton handleClick={setMax}>MAX</AlternateButton>
        </div>
        <p className="mt-5 text-center text-xs text-grey">
          You will receive {amount.toLocaleString('US')} {coins[selectedCoin]}
        </p>
        <AddUSDC />
        <PrimaryButton handleClick={handleMint} className="mt-5">
          {isPending ? 'Minting...' : 'Mint Token'}
        </PrimaryButton>
      </div>
    </>
  )
}

export default FaucetComponent

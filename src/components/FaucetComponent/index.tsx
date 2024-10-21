'use client'

import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { createPublicClient, createWalletClient, parseUnits, TransactionReceiptNotFoundError, type Hash } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { arbitrumSepolia } from 'viem/chains'

import { http, useAccount, useBalance } from 'wagmi'

import AddToken from '@/components/common/AddToken'
import { AlternateButton, PrimaryButton } from '@/components/common/Buttons'
import Card from '@/components/common/Card'
import Input from '@/components/common/Input'
import Select from '@/components/common/Select'
import ContractReads from '@/hooks/useContractReads'
import useMint from '@/hooks/useMint'
import { PRIVATE_KEY } from '@/utils/constants'
import createTransactionAlert from '@/utils/createTransactionAlert'

const coins = ['USDC']
const contracts = ['0xD32ea1C76ef1c296F131DD4C5B2A0aac3b22485a']

const FaucetComponent = () => {
  const router = useRouter()
  const { address, isConnected } = useAccount()
  const { MintTokens, isPending, error, hash } = useMint()
  const [amount, setAmount] = useState<number>(0)
  const [selectedCoin, setSelectedCoin] = useState<number>(0)
  const { CheckWhitelist } = ContractReads()

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

  const whitelistCheck = CheckWhitelist(address).data as boolean

  useEffect(() => {
    if (hash) {
      createTransactionAlert('Tokens Minted', true)
      router.push('/dashboard')
    }
    if (error) {
      createTransactionAlert('Erro: Tokens Not Minted', false)
    }
  }, [hash, error, router])

  const handleSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCoin(coins.indexOf(event.target.value))
  }

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
    <Card className="mx-auto h-fit w-[50%]">
      <p className="mx-auto w-fit pb-[4vh] text-3xl font-bold text-white">REQUEST TOKENS</p>
      {!isConnected && <p className="mx-auto text-center text-2xl text-carmesi">Connect a wallet to get tokens</p>}
      {isConnected && whitelistCheck && (
        <div className="space-y-4">
          <Select
            handleChange={handleSelected}
            value={coins[selectedCoin]}
            options={coins}
            className="!text-md !w-full border-2 py-[1vh] text-center"
          />
          <AddToken
            tokenAddress={contracts[selectedCoin]}
            tokenSymbol={coins[selectedCoin]}
            tokenDecimals={selectedCoin <= 1 ? 6 : 18}
            classname="!text-lg hover:scale-105"
          />
          <div className="flex items-center justify-center">
            <Input
              placeholder="Amount..."
              type="number"
              value={amount}
              handleChange={handleSearch}
              className="rounded-r-none text-center"
            />
            <AlternateButton handleClick={setMax} border className="rounded-l-none">
              MAX
            </AlternateButton>
          </div>
          <PrimaryButton handleClick={handleMint}>{isPending ? 'Minting...' : 'Mint Token'}</PrimaryButton>
        </div>
      )}

      {isConnected && (
        <>
          <div className="my-[4vh] w-full border-t border-greySmoke" />
          {!isSending ? (
            <>
              <p className="mx-auto mb-[1vh] text-center text-greySmoke">
                Your ETH Balance: {ethBalance.toFixed(6)} ETH
              </p>
              <div className="mb-[2vh] flex items-center justify-center">
                <span className={`h-3 w-3 rounded-full ${isEligibleForEth ? 'bg-carmesi' : 'bg-red-500'}`} />
                <p className="ml-2 text-white">
                  {isEligibleForEth ? 'Eligible to receive ETH' : 'Not eligible to receive ETH'}
                </p>
              </div>{' '}
            </>
          ) : (
            <p className="text-center text-carmesi">Sending Gas Eth...</p>
          )}
        </>
      )}
    </Card>
  )
}

export default FaucetComponent

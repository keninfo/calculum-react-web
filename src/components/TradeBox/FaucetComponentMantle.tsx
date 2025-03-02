'use client'

import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { track } from '@vercel/analytics/react'

import React, { useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { createWalletClient, parseUnits, TransactionReceiptNotFoundError, type Hash } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mantleSepoliaTestnet } from 'viem/chains'

import { http, useAccount, useBalance } from 'wagmi'

import { PrimaryButton } from '@/components/common/Buttons'
import { publicClient } from '@/config/viem-client'
import useMint from '@/hooks/useMint'
import { PRIVATE_KEY } from '@/utils/constants'
import createTransactionAlert from '@/utils/createTransactionAlert'

import { AmountContext } from './index'

const coins = ['MNT']
const contracts = ['0xA7Fcb606611358afa388b6bd23b3B2F2c6abEd82']

const FaucetComponentMantle = ({ inMaintenance }: { inMaintenance: boolean }) => {
  const router = useRouter()
  const { address } = useAccount()
  const { MintTokens, isPending, error, isConfirmed } = useMint()
  const [isConfirming, setIsConfirming] = useState<boolean>(false)
  const { amount, setAmount } = useContext(AmountContext)
  const [selectedCoin] = useState<number>(0)

  const [isSending, setIsSending] = useState(false)
  const [hasRequestedETH, setHasRequestedETH] = useState(false)

  const { data: ethBalanceData, refetch: refetchBalance } = useBalance({
    address,
  })

  const ethBalance = parseFloat(ethBalanceData?.formatted || '0')
  const isEligibleForEth = ethBalance < 0.0005 && !hasRequestedETH

  useEffect(() => {
    setAmount(10000)
  })

  useEffect(() => {
    if (isConfirmed) {
      createTransactionAlert('Tokens Minted', true)
    }
    if (error) {
      setIsConfirming(false)
      createTransactionAlert('Error: Tokens Not Minted', false)
    }
  }, [isConfirmed, error, router])

  const handleSendTokens = async () => {
    try {
      setIsSending(true)
      const faucetAccount = privateKeyToAccount(`0x${PRIVATE_KEY}`)
      const faucetClient = createWalletClient({
        chain: mantleSepoliaTestnet,
        transport: http(),
        account: faucetAccount,
      })
      // const publicClient = createPublicClient({
      //   chain: arbitrumSepolia,
      //   transport: http(),
      // })

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
    track('Mint Clicked')
    if (isEligibleForEth) {
      try {
        await handleSendTokens()
      } catch {
        return
      }
    }
    setIsConfirming(true)
    await MintTokens(contracts[selectedCoin], address as Hash, amount, selectedCoin <= 1 ? 6 : 18)
  }

  return (
    <>
      <p className="text-center">To start, you will need MNT from the faucet. </p>

      {!inMaintenance && (
        <PrimaryButton handleClick={handleMint} className="my-5" disabled={isSending || isPending || isConfirming}>
          {isConfirming && !isPending && (
            <p className="mr-2">
              <FontAwesomeIcon icon={['fas', 'spinner' as IconName]} className="animate-spin" />
            </p>
          )}
          {isSending ? 'Sending ETH...' : isPending ? 'Minting...' : isConfirming ? 'Confirming...' : `Let's go!`}
        </PrimaryButton>
      )}
      <p className="mt-5 text-center text-xs text-grey">
        You will receive {amount.toLocaleString('US')} {coins[selectedCoin]}
      </p>
    </>
  )
}

export default FaucetComponentMantle

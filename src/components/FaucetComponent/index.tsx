'use client'

import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import type { Hash } from 'viem'

import type { BaseError } from 'wagmi'
import { useAccount } from 'wagmi'

import NotWhitelist from '@/components/ActionCard/NotWhitelist'
import AddToken from '@/components/common/AddToken'
import { AlternateButton, PrimaryButton } from '@/components/common/Buttons'
import Card from '@/components/common/Card'
import Input from '@/components/common/Input'
import Select from '@/components/common/Select'
import ContractReads from '@/hooks/useContractReads'
import useMint from '@/hooks/useMint'
import createTransactionAlert from '@/utils/createTransactionAlert'

// const coins = ['USDC', 'wUSDT', 'BTC', 'ETH', 'WARB', 'VRTX']
const coins = ['USDC']

// const contracts = [
//   '0xD32ea1C76ef1c296F131DD4C5B2A0aac3b22485a',
//   '0xA1c062ddEf8f7B0a97e3Bb219108Ce73410772cE',
//   '0xA7Fcb606611358afa388b6bd23b3B2F2c6abEd82',
//   '0x94B3173E0a23C28b2BA9a52464AC24c2B032791c',
//   '0x0881FAabdDdECf1B4c3D5331DF33C13A1b6589ea',
//   '0x00aBCa5597d51e6C06eCfA655E73CE70A1e2cdCf',
// ]

const contracts = ['0xD32ea1C76ef1c296F131DD4C5B2A0aac3b22485a']

const FaucetComponent = () => {
  const router = useRouter()
  const { address, isConnected } = useAccount()
  const { MintTokens, isPending, error, hash } = useMint()
  const [amount, setAmount] = useState<number>(0)
  const [selectedCoin, setSelectedCoin] = useState<number>(0)
  const { CheckWhitelist } = ContractReads()

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = event.target.value
    setAmount(parseFloat(amount))
  }

  const whitelistCheck = CheckWhitelist(address).data as boolean

  useEffect(() => {
    if (hash) {
      createTransactionAlert('Tokens Minted', true)
      router.push('/dashboard')
    }
    if (error) {
      createTransactionAlert((error as BaseError).shortMessage || error.message, false)
    }
  }, [hash, error, router])

  const handleSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const number = coins.indexOf(event.target.value)
    setSelectedCoin(number)
  }

  const setMax = () => {
    if (selectedCoin <= 1) {
      setAmount(10000)
    } else {
      setAmount(99)
    }
  }

  // const handleSendTokens = () => {
  //   const faucetAccount = privateKeyToAccount(`0x${PRIVATE_KEY}`)
  //   const faucetClient = createWalletClient({
  //     chain: arbitrumSepolia,
  //     transport: http(),
  //     account: faucetAccount,
  //   })

  //   const txHash = faucetClient.sendTransaction({
  //     account: faucetAccount,
  //     to: address as Hash,
  //     value: parseUnits((0.0005).toString(), 18),
  //   })

  //   console.log('Transaction Hash:', txHash)
  // }

  return (
    <Card className="mx-auto h-fit w-[50%]">
      <p className="mx-auto w-fit pb-[4vh] text-3xl font-bold text-white">REQUEST TOKENS</p>
      {!isConnected && <p className="mx-auto text-center text-2xl text-carmesi">Connect a wallet to get tokens </p>}
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
            classname={'!text-lg hover:scale-105'}
          />
          <div className="flex items-center justify-center">
            <Input
              placeholder={'Amount...'}
              type={'number'}
              value={amount}
              handleChange={handleSearch}
              className="rounded-r-none text-center"
            />
            <AlternateButton handleClick={setMax} border={true} className="rounded-l-none">
              MAX
            </AlternateButton>
          </div>
          <PrimaryButton
            handleClick={() => MintTokens(contracts[selectedCoin], address as Hash, amount, selectedCoin <= 1 ? 6 : 18)}
          >
            {isPending ? 'Minting...' : 'Mint Token'}
          </PrimaryButton>
        </div>
      )}
      {isConnected && !whitelistCheck && (
        <div className="mx-auto w-[50%]">
          <NotWhitelist />
        </div>
      )}
      {/* <div className="w-full border-t border-greySmoke my-[4vh]"></div>
      <p className="text-greySmoke mx-auto text-center mb-[1vh]">{`Don't have any ETH for gas fees?`}</p>
      <button
        className={`bg-smoke text-sm py-[2vh] flex justify-center text-white  hover:scale-110 w-[100%] rounded-lg  hover:text-carmesi`}
        onClick={handleSendTokens}
      >
        Send transaction
      </button> */}
    </Card>
  )
}

export default FaucetComponent

'use client'

import React, { useEffect, useState } from 'react'

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

const coins = ['USDC', 'wUSDT', 'BTC', 'ETH', 'WARB', 'VRTX']

const contracts = [
  '0xD32ea1C76ef1c296F131DD4C5B2A0aac3b22485a',
  '0xA1c062ddEf8f7B0a97e3Bb219108Ce73410772cE',
  '0xA7Fcb606611358afa388b6bd23b3B2F2c6abEd82',
  '0x94B3173E0a23C28b2BA9a52464AC24c2B032791c',
  '0x0881FAabdDdECf1B4c3D5331DF33C13A1b6589ea',
  '0x00aBCa5597d51e6C06eCfA655E73CE70A1e2cdCf',
]

const Page = () => {
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
    }
    if (error) {
      createTransactionAlert((error as BaseError).shortMessage || error.message, false)
    }
  }, [hash, error])

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

  return (
    <div className={`w-full h-screen flex justify-center items-center`}>
      <Card className="h-fit w-[50%] mx-auto">
        <p className="text-white text-3xl mx-auto w-fit pb-[4vh] font-bold">REQUEST TOKENS</p>
        {!isConnected && <p className="text-2xl text-carmesi mx-auto text-center">Connect a wallet to get tokens </p>}
        {isConnected && whitelistCheck && (
          <div className="space-y-4 ">
            <Select
              handleChange={handleSelected}
              value={coins[selectedCoin]}
              options={coins}
              className="!w-full text-center py-[1vh] border-2 !text-md"
            />
            <Input
              placeholder={address}
              type={'text'}
              value={`${contracts[selectedCoin]}`}
              disabled={true}
              className="text-center bg-smoke !text-greySmoke"
            />
            <AddToken
              tokenAddress={contracts[selectedCoin]}
              tokenSymbol={coins[selectedCoin]}
              tokenDecimals={selectedCoin <= 1 ? 6 : 18}
              classname={'!text-lg hover:scale-105'}
            />
            <div className="flex justify-center items-center">
              <Input
                placeholder={'Amount...'}
                type={'number'}
                value={amount}
                handleChange={handleSearch}
                className="text-center rounded-r-none"
              />
              <AlternateButton handleClick={setMax} border={true} className="rounded-l-none">
                MAX
              </AlternateButton>
            </div>

            <PrimaryButton
              handleClick={() =>
                MintTokens(contracts[selectedCoin], address as Hash, amount, selectedCoin <= 1 ? 6 : 18)
              }
            >
              {isPending ? 'Minting...' : 'Mint Token'}
            </PrimaryButton>
          </div>
        )}
        {isConnected && !whitelistCheck && (
          <div className="w-[50%] mx-auto">
            <NotWhitelist />
          </div>
        )}
      </Card>
    </div>
  )
}

export default Page

import React, { useEffect } from 'react'

import { useAccount, type BaseError } from 'wagmi'

import useClaimAssets from '@/hooks/useClaimAssets'
import useContract from '@/hooks/useContract'
import ContractReads from '@/hooks/useContractReads'
import createTransactionAlert from '@/utils/createTransactionAlert'

import { PrimaryButton } from '../common/Buttons'
import CryptoIcon from '../common/CryptoIcon'

type responseData = [number, bigint, bigint, bigint]

const ClaimAssets = () => {
  const { contractAddress, contractAbi } = useContract()
  const { address } = useAccount()
  const { ClaimAssets, hash, error } = useClaimAssets()
  const { Withdrawals, IsClaimerWithdraw } = ContractReads(contractAddress, contractAbi)
  const [, , userWithdrawalsAssets] = (Withdrawals(address).data || []) as responseData

  const claimerWithdraw = IsClaimerWithdraw(address).data as boolean

  useEffect(() => {
    if (hash) {
      createTransactionAlert('Transaction Confirmed', true)
    }
    if (error) {
      createTransactionAlert((error as BaseError).shortMessage || error.message, false)
    }
  }, [hash, error])

  return (
    <>
      <div className="my-5 flex items-center justify-center space-x-5">
        <CryptoIcon coin="USDC" className="h-[50px]" />
        <div className="text-left">
          <p>{(Number(userWithdrawalsAssets) / 1000000000000000000).toLocaleString('US')}</p>
          <h4 className="text-[#DCCD5B]">USDC</h4>
        </div>
      </div>

      <div className="">
        {claimerWithdraw ? (
          <PrimaryButton handleClick={() => ClaimAssets(address, contractAddress, contractAbi)}>
            Claim All Assets
          </PrimaryButton>
        ) : (
          <p className="w-full rounded-lg bg-[#535E73] px-4 py-2 text-center text-[#888E96]">{`Wait one epoch to be able to claim all assets`}</p>
        )}
      </div>
    </>
  )
}

export default ClaimAssets

import React, { useEffect } from 'react'

import { type BaseError } from 'wagmi'

import ClearButton from '@/components/common/ClearButton'
import useClaimAssets from '@/hooks/useClaimAssets'
import ContractReads from '@/hooks/useContractReads'
import createTransactionAlert from '@/utils/createTransactionAlert'

interface ClaimProps {
  assets: string
  address: string | undefined
}

const ClaimWithdraw = ({ assets, address }: ClaimProps) => {
  const { ClaimAssets, hash, error } = useClaimAssets()
  const { IsClaimerWithdraw } = ContractReads()

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
    <div className="my-[2vh] inline p-[1vw] text-sm">
      <div className="mb-[1vh]">
        <h4>ASSETS</h4>
        <p>{assets}</p>
      </div>

      <div className="">
        {claimerWithdraw ? (
          <ClearButton handleClickClearButton={() => ClaimAssets(address)}>Claim All Assets</ClearButton>
        ) : (
          <p className="w-full rounded-lg bg-carmesi px-[2vw] py-[1vh] text-center">{`You don't have any to claim.`}</p>
        )}
      </div>
    </div>
  )
}

export default ClaimWithdraw

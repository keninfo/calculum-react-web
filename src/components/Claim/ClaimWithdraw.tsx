import React from 'react'

import ClearButton from '@/components/common/ClearButton'
import useClaimAssets from '@/hooks/useClaimAssets'
import ContractReads from '@/hooks/useContractReads'

interface ClaimProps {
  assets: string
  address: string | undefined
}

const ClaimWithdraw = ({ assets, address }: ClaimProps) => {
  const { ClaimAssets } = useClaimAssets()
  const { IsClaimerWithdraw } = ContractReads()

  const claimerWithdraw = IsClaimerWithdraw(address).data as boolean

  return (
    <div className="inline p-[1vw] my-[2vh] text-sm">
      <div className="mb-[1vh]">
        <h4>ASSETS</h4>
        <p>{assets}</p>
      </div>

      <div className="">
        {claimerWithdraw ? (
          <ClearButton handleClickClearButton={() => ClaimAssets(address)}>Claim All Assets</ClearButton>
        ) : (
          <p className="text-center w-full bg-carmesi px-[2vw] rounded-lg py-[1vh]">{`You don't have any to claim.`}</p>
        )}
      </div>
    </div>
  )
}

export default ClaimWithdraw

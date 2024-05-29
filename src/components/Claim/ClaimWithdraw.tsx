import React from 'react'

import ClearButton from '../common/ClearButton'
import useClaimAssets from '@/hooks/useClaimAssets'

interface ClaimProps {
  assets: string
  address: string | undefined
}

const ClaimWithdraw = ({ assets, address }: ClaimProps) => {
  const { ClaimAssets } = useClaimAssets()
  return (
    <>
      <div className="flex justify-between p-[1vw] my-[2vh] text-sm">
        <h4>Assets</h4>
        <p>{assets}</p>
      </div>
      {parseFloat(assets) > 0 ? (
        <ClearButton handleClickClearButton={() => ClaimAssets(address)}>Claim All Shares</ClearButton>
      ) : (
        <p className="text-center w-full bg-carmesi px-[2vw] py-[1vh] rounded-lg">{`You don't have Shares to claim.`}</p>
      )}
    </>
  )
}

export default ClaimWithdraw

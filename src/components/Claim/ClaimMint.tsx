import React from 'react'

import ClearButton from '../common/ClearButton'
import useClaimShares from '@/hooks/useClaimShares'


interface ClaimProps {
  shares: string
  address: string | undefined
}

const ClaimMint = ({ shares, address }: ClaimProps) => {
  const { ClaimShares } = useClaimShares()
  return (
    <>
      <div className="flex justify-between p-[1vw] my-[2vh] text-sm">
        <h4>SHARES</h4>
        <p>{shares}</p>
      </div>
      {parseFloat(shares) > 0 ? (
        <ClearButton handleClickClearButton={() => ClaimShares(address)}>Claim All Shares</ClearButton>
      ) : (
        <p className="text-center w-full bg-carmesi px-[2vw] py-[1vh] rounded-lg">{`You don't have Shares to claim.`}</p>
      )}
    </>
  )
}

export default ClaimMint

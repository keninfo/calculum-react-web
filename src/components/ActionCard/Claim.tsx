import React, { useState } from 'react'

import type { Hash } from 'viem'

import { useAccount, useReadContract, useWriteContract } from 'wagmi'

import ClearButton from '@/components/common/ClearButton'
import { calculumVaultContract } from '@/contracts/calculumVault'
import { formatBalance, formatShares } from '@/utils/formatters'

const Claim = () => {
  const [selected, setSelected] = useState<number>(0)

  const { address } = useAccount()
  const { writeContract } = useWriteContract()

  const { data } = useReadContract({
    abi: calculumVaultContract.abi,
    address: calculumVaultContract.address as Hash,
    functionName: 'DEPOSITS',
    args: [address],
  })

  const [userStatus, userAssets, userShares] = (data || []) as bigint[]
  const userStatusResult = Number(userStatus)

  function claimShares() {
    writeContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'claimShares',
      args: [address],
    })
  }

  function claimAssets() {
    writeContract({
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'claimAssets',
      args: [address, address],
    })
  }

  return (
    <div className="text-sm">
      {userStatusResult == 1 && (
        <>
          <p className="mt-[4vh] mb-[2vh]">Your shares are still pending, wait one Epoch to be able to claim them!</p>
          <div className="text-center border-2 bg-smoke rounded-lg px-[2vw] py-[1vh]  border-white">
            <h4>PENDING SHARES</h4>
            <p>{formatShares(userShares)}</p>
          </div>
        </>
      )}
      {userStatusResult !== 1 && (
        <>
          <div className="flex justify-between p-[1vw] my-[2vh] text-sm">
            <div
              className={`text-center border-2  bg-smoke rounded-lg px-[2vw] py-[1vh] cursor-pointer  hover:scale-105 ${selected == 0 ? 'border-white' : 'border-smoke'}`}
              onClick={() => setSelected(0)}
            >
              <h4>ASSETS</h4>
              <p>{formatBalance(userAssets)}</p>
            </div>
            <div
              className={`text-center border-2  bg-smoke rounded-lg px-[2vw] py-[1vh] cursor-pointer  hover:scale-105 ${selected == 1 ? 'border-white' : 'border-smoke'}`}
              onClick={() => setSelected(1)}
            >
              <h4>SHARES</h4>
              <p>{formatShares(userShares)}</p>
            </div>
          </div>
          <div className="flex justify-between items-center px-2">
            {selected == 0 && userAssets > 0 && (
              <ClearButton handleClickClearButton={() => claimAssets()}>Claim All Assets</ClearButton>
            )}
            {selected == 1 && userShares > 0 && (
              <ClearButton handleClickClearButton={() => claimShares()}>Claim All Shares</ClearButton>
            )}
            {selected == 0 && userAssets <= 0 && (
              <p className="text-center w-full text-carmesi">{`You don't have Assets to claim.`}</p>
            )}

            {selected == 1 && userShares <= 0 && (
              <p className="text-center w-full text-carmesi">{`You don't have Shares to claim.`}</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Claim

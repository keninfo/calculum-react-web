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

  const { data: dataWithdrawals } = useReadContract({
    abi: calculumVaultContract.abi,
    address: calculumVaultContract.address as Hash,
    functionName: 'WITHDRAWALS',
    args: [address],
  })

  const { data: dataDeposits } = useReadContract({
    abi: calculumVaultContract.abi,
    address: calculumVaultContract.address as Hash,
    functionName: 'DEPOSITS',
    args: [address],
  })

  const [userWithdrawalsStatus, userWithdrawalsAssets] = (dataWithdrawals || []) as bigint[]
  const [userDepositsStatus, , userDepositsShares] = (dataDeposits || []) as bigint[]

  const userWithdrawalsStatusResult = Number(userWithdrawalsStatus)
  const userDepositsStatusResult = Number(userDepositsStatus)

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
      {/* 0 - user hasn't made a deposit yet */}
      {userDepositsStatusResult == 0 && (
        <>
          <p className="bg-carmesi  px-[2vw] py-[1vh] rounded-lg mt-[4vh] mb-[2vh]">
            {`You haven't made a deposit into this strategy yet.`}
          </p>
        </>
      )}
      {/* 1 - user made a deposit but has to wait one epoch */}
      {userDepositsStatusResult == 1 && (
        <>
          <p className="text-center w-full bg-carmesi px-[2vw] py-[1vh] rounded-lg mt-[4vh] mb-[2vh]">
            Your shares are still pending, wait one Epoch to be able to claim them!
          </p>
          <div className="text-center border-2 bg-smoke rounded-lg px-[2vw] py-[1vh]  border-white">
            <h4>PENDING SHARES</h4>
            <p>{formatShares(userDepositsShares)}</p>
          </div>
        </>
      )}
      {/* 2 -  user can claim chares*/}
      {userDepositsStatusResult === 2 && (
        <>
          <div className="flex justify-between p-[1vw] my-[2vh] text-sm">
            <div
              className={`text-center border-2  bg-smoke rounded-lg px-[2vw] py-[1vh] cursor-pointer  hover:scale-105 ${selected == 0 ? 'border-white' : 'border-smoke'}`}
              onClick={() => setSelected(0)}
            >
              <h4>ASSETS</h4>
              <p>{formatBalance(userWithdrawalsAssets)}</p>
            </div>
            <div
              className={`text-center border-2  bg-smoke rounded-lg px-[2vw] py-[1vh] cursor-pointer  hover:scale-105 ${selected == 1 ? 'border-white' : 'border-smoke'}`}
              onClick={() => setSelected(1)}
            >
              <h4>SHARES</h4>
              <p>{formatShares(userDepositsShares)}</p>
            </div>
          </div>
          <div className="flex justify-between items-center px-2">
            {selected == 1 && userDepositsShares > 0 && (
              <ClearButton handleClickClearButton={() => claimShares()}>Claim All Shares</ClearButton>
            )}
            {selected == 1 && userDepositsShares <= 0 && (
              <p className="text-center w-full bg-carmesi px-[2vw] py-[1vh] rounded-lg">{`You don't have Shares to claim.`}</p>
            )}
          </div>
        </>
      )}
      {/* 3 - deposit and withdraw completed should be able to claim */}
      {userDepositsStatusResult === 3 && userWithdrawalsStatusResult === 3 && (
        <>
          <div className="flex justify-between p-[1vw] my-[2vh] text-sm">
            <div
              className={`text-center border-2  bg-smoke rounded-lg px-[2vw] py-[1vh] cursor-pointer  hover:scale-105 ${selected == 0 ? 'border-white' : 'border-smoke'}`}
              onClick={() => setSelected(0)}
            >
              <h4>ASSETS</h4>
              <p>{formatBalance(userWithdrawalsAssets)}</p>
            </div>
            <div
              className={`text-center border-2  bg-smoke rounded-lg px-[2vw] py-[1vh] cursor-pointer  hover:scale-105 ${selected == 1 ? 'border-white' : 'border-smoke'}`}
              onClick={() => setSelected(1)}
            >
              <h4>SHARES</h4>
              <p>{formatShares(userDepositsShares)}</p>
            </div>
          </div>
          <div className="flex justify-between items-center px-2">
            {selected == 0 && userWithdrawalsAssets > 0 && (
              <ClearButton handleClickClearButton={() => claimAssets()}>Claim All Assets</ClearButton>
            )}
            {selected == 1 && userDepositsShares > 0 && (
              <ClearButton handleClickClearButton={() => claimShares()}>Claim All Shares</ClearButton>
            )}
            {selected == 0 && userWithdrawalsAssets <= 0 && (
              <p className="text-center w-full bg-carmesi px-[2vw] py-[1vh] rounded-lg">{`You don't have Assets to claim.`}</p>
            )}

            {selected == 1 && userDepositsShares <= 0 && (
              <p className="text-center w-full bg-carmesi px-[2vw] py-[1vh] rounded-lg">{`You don't have Shares to claim.`}</p>
            )}
          </div>
        </>
      )}
      {/* 4 and 5 - user has redeemed or withdrawal has to wait one epoch  */}
      {userWithdrawalsStatusResult == 4 ||
        (userWithdrawalsStatusResult == 5 && (
          <>
            <p className="bg-carmesi  px-[2vw] py-[1vh] rounded-lg mt-[4vh] mb-[2vh]">
              Your assets are still pending for Withdraw/Redeem, wait one Epoch to be able to claim them!
            </p>
            <div className="text-center border-2 bg-smoke rounded-lg px-[2vw] py-[1vh]  border-white">
              <h4>PENDING ASSETS</h4>
              <p>{formatBalance(userWithdrawalsAssets)}</p>
            </div>
          </>
        ))}
    </div>
  )
}

export default Claim

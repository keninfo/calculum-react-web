import React, { useEffect } from 'react'

import { useAccount, type BaseError } from 'wagmi'

import AddToken from '@/components/common/AddToken'
import { PrimaryButton } from '@/components/common/Buttons'
import useClaimShares from '@/hooks/useClaimShares'
import useContract from '@/hooks/useContract'
import ContractReads from '@/hooks/useContractReads'
import createTransactionAlert from '@/utils/createTransactionAlert'
import { formatShares } from '@/utils/formatters'

type responseData = [number, bigint, bigint, bigint]

const ClaimMint = () => {
  const { address } = useAccount()
  const { contractAddress, contractAbi, symbol, icon } = useContract()
  const { ClaimShares, hash, error } = useClaimShares()
  const { IsClaimerMint, Deposits } = ContractReads(contractAddress, contractAbi)
  const [, , userDepositsShares] = (Deposits(address).data || []) as responseData
  const claimerMint = IsClaimerMint(address).data as boolean

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
      <AddToken />
      <div className="my-5 flex items-center justify-center space-x-5">
        <img src={`${icon}`} width={50} height={50} alt="image" className="rounded-full" />
        <div className="text-left">
          <p>{Number(formatShares(userDepositsShares)).toLocaleString('US')}</p>
          <h4 className="text-citron">{symbol}</h4>
        </div>
      </div>

      <div className="">
        {claimerMint ? (
          <PrimaryButton handleClick={() => ClaimShares(address, contractAddress, contractAbi)}>
            Claim All Shares
          </PrimaryButton>
        ) : (
          <p className="w-full rounded-lg bg-payne px-4 py-2 text-center text-grey">{`Wait one epoch to be able to claim all shares`}</p>
        )}
      </div>
    </>
  )
}

export default ClaimMint

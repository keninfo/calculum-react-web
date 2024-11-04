import React, { useEffect } from 'react'

import { useAccount, type BaseError } from 'wagmi'

import AddToken from '@/components/common/AddToken'
import { PrimaryButton } from '@/components/common/Buttons'
import useClaimShares from '@/hooks/useClaimShares'
import useContract from '@/hooks/useContract'
import ContractReads from '@/hooks/useContractReads'
import { useOptionsStore } from '@/store/useOptionsStore'
import createTransactionAlert from '@/utils/createTransactionAlert'
import { formatShares } from '@/utils/formatters'

type responseData = [number, bigint, bigint, bigint]

const ClaimMint = () => {
  const { strategy } = useOptionsStore()
  const { address } = useAccount()
  const { contractAddress, contractAbi } = useContract()
  const { ClaimShares, hash, error } = useClaimShares()
  const { IsClaimerMint, Deposits, SymbolShares } = ContractReads(contractAddress, contractAbi)
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

  const symbol = SymbolShares().data as string

  return (
    <>
      <AddToken />
      <div className="my-5 flex items-center justify-center space-x-5">
        <img
          src={`${strategy == 'Smoothcoin' ? '/bearLogo.png' : ''}`}
          width={50}
          height={50}
          alt="image"
          className="rounded-full"
        />
        <div className="text-left">
          <p>{formatShares(userDepositsShares)}</p>
          <h4 className="text-[#DCCD5B]">{symbol}</h4>
        </div>
      </div>

      <div className="">
        {claimerMint ? (
          <PrimaryButton handleClick={() => ClaimShares(address, contractAddress, contractAbi)}>
            Claim All Smoothcoins
          </PrimaryButton>
        ) : (
          <p className="w-full rounded-lg bg-[#535E73] px-4 py-2 text-center text-[#888E96]">{`Wait one epoch to be able to claim all shares`}</p>
        )}
      </div>
    </>
  )
}

export default ClaimMint

import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHover } from '@uidotdev/usehooks'

import React, { useEffect, useState } from 'react'

import { useAccount, type BaseError } from 'wagmi'

import AddToken from '@/components/common/AddToken'
import { PrimaryButton } from '@/components/common/Buttons'
import useClaimShares from '@/hooks/useClaimShares'
import useContract from '@/hooks/useContract'
import ContractReads from '@/hooks/useContractReads'
import createTransactionAlert from '@/utils/createTransactionAlert'
import { formatShares } from '@/utils/formatters'

type responseData = [number, bigint, bigint, bigint]

const ClaimMint = ({ inMaintenance }: { inMaintenance: boolean }) => {
  const { address } = useAccount()
  const { contractAddress, contractAbi, symbol } = useContract()
  const { ClaimShares, hash, error, isPending } = useClaimShares()
  const { IsClaimerMint, Deposits } = ContractReads(contractAddress, contractAbi)
  const [, , userDepositsShares] = (Deposits(address).data || []) as responseData
  const claimerMint = IsClaimerMint(address).data as boolean
  const [isConfirming, setIsConfirming] = useState<boolean>(false)

  const [ref, hovering] = useHover()

  const handleClaim = () => {
    setIsConfirming(true)
    ClaimShares(address, contractAddress, contractAbi)
  }

  useEffect(() => {
    if (hash) {
      createTransactionAlert('Transaction Confirmed', true)
    }
    if (error) {
      setIsConfirming(false)
      createTransactionAlert((error as BaseError).shortMessage || error.message, false)
    }
  }, [hash, error])

  return (
    <>
      <AddToken />
      <div className="my-5 flex items-center justify-center space-x-5">
        {/* <img src={`${icon}`} width={50} height={50} alt="image" className="rounded-full" /> */}
        <div className="text-left text-xl">
          <p>
            {Number(formatShares(userDepositsShares)).toLocaleString('US')}
            <b> {symbol}</b>
          </p>
        </div>
      </div>

      {!inMaintenance && (
        <div className="">
          {claimerMint ? (
            <PrimaryButton handleClick={() => handleClaim()} disabled={isPending || isConfirming}>
              {isConfirming && !isPending && (
                <p className="mr-2">
                  <FontAwesomeIcon icon={['fas', 'spinner' as IconName]} className="animate-spin" />
                </p>
              )}
              {isPending ? 'Claiming...' : isConfirming ? 'Confirming...' : 'Claim all shares'}
            </PrimaryButton>
          ) : (
            <>
              <p className="flex w-full justify-center rounded-lg bg-payne px-4 py-2 text-center text-grey">
                <p className="mr-2">
                  <FontAwesomeIcon icon={['fas', 'spinner' as IconName]} className="animate-spin" />
                </p>
                {`Deposit in progress...`}
              </p>
              <p className="relative mt-4 text-center text-xs">
                <p className="cursor-default text-offWhite" ref={ref}>
                  {`How long do deposits take?`} <FontAwesomeIcon icon={['fas', 'circle-info' as IconName]} />
                </p>
                {hovering && (
                  <p className="absolute bottom-6 left-1/2 w-full -translate-x-1/2 rounded-md border bg-dark px-4 pb-6 pt-5">
                    {`Deposits are made after the current epoch. Epochs take approx. 4 hours. So depending when during the
                    epoch you made the deposit, you'll be able to claim your shares sooner.`}
                  </p>
                )}
              </p>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default ClaimMint

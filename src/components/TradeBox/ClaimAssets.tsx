import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHover } from '@uidotdev/usehooks'

import React, { useEffect, useState } from 'react'

import { useAccount, type BaseError } from 'wagmi'

import AddUSDC from '@/components/common/AddToken/AddUSDC'
import { PrimaryButton } from '@/components/common/Buttons'
import CryptoIcon from '@/components/common/CryptoIcon'
import useClaimAssets from '@/hooks/useClaimAssets'
import useContract from '@/hooks/useContract'
import ContractReads from '@/hooks/useContractReads'
import createTransactionAlert from '@/utils/createTransactionAlert'

type responseData = [number, bigint, bigint, bigint]

const ClaimAssets = ({ inMaintenance }: { inMaintenance: boolean }) => {
  const { contractAddress, contractAbi } = useContract()
  const { address } = useAccount()
  const { ClaimAssets, hash, error, isPending } = useClaimAssets()
  const { Withdrawals, IsClaimerWithdraw } = ContractReads(contractAddress, contractAbi)
  const [, amountAssets] = (Withdrawals(address).data || []) as responseData
  const [isConfirming, setIsConfirming] = useState<boolean>(false)

  const [ref, hovering] = useHover()

  const handleClaim = () => {
    setIsConfirming(true)
    ClaimAssets(address, contractAddress, contractAbi)
  }

  const claimerWithdraw = IsClaimerWithdraw(address).data as boolean

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
      <AddUSDC />
      <div className="my-5 flex items-center justify-center space-x-2">
        <CryptoIcon coin="USDC" className="h-[20px]" />
        <div className="text-left text-xl">
          <p>
            {amountAssets ? (Number(amountAssets) / 1000000).toLocaleString('US') : 'Loading...'} <b>USDC</b>
          </p>
        </div>
      </div>

      {!inMaintenance && (
        <div className="">
          {claimerWithdraw ? (
            <PrimaryButton handleClick={() => handleClaim()} disabled={isPending || isConfirming}>
              {isConfirming && !isPending && (
                <p className="mr-2">
                  <FontAwesomeIcon icon={['fas', 'spinner' as IconName]} className="animate-spin" />
                </p>
              )}
              {isPending ? 'Claiming...' : isConfirming ? 'Confirming...' : 'Claim all assets'}
            </PrimaryButton>
          ) : (
            <>
              <p className="flex w-full justify-center rounded-lg bg-payne px-4 py-2 text-center text-grey">
                <p className="mr-2">
                  <FontAwesomeIcon icon={['fas', 'spinner' as IconName]} className="animate-spin" />
                </p>
                {`Withdrawing in progress...`}
              </p>
              <p className="relative mt-4 text-center text-xs">
                <p className="cursor-default text-offWhite" ref={ref}>
                  {`How long do withdraws take?`} <FontAwesomeIcon icon={['fas', 'circle-info' as IconName]} />
                </p>
                {hovering && (
                  <p className="absolute bottom-6 left-1/2 w-full -translate-x-1/2 rounded-md border bg-dark px-4 pb-6 pt-5">
                    {`Withdraws are made after the current epoch. Epochs take approx. 4 hours. So depending when during
                    the epoch you made the deposit, you'll be able to claim your shares sooner.`}
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

export default ClaimAssets

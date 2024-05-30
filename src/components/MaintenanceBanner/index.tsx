import React from 'react'

import type { Hash } from 'viem'

import { useReadContract } from 'wagmi'

import { calculumVaultContract } from '@/contracts/calculumVault'

function MaintenanceBanner() {
  const fetchMaintenance = useReadContract({
    abi: calculumVaultContract.abi,
    address: calculumVaultContract.address as Hash,
    functionName: 'isMaintenance',
  })

  let status = false
  const data = fetchMaintenance.data as [boolean, number]
  if (data) {
    status = data[0] as boolean
  }

  return (
    <>
      {status && (
        <div className="fixed top-0 left-0 w-screen h-fit z-50 bg-carmesi text-white text-center py-2 text-sm">
          The contract is currently undergoing maintenance. Please allow 15 minutes for the process to complete. Thank
          you for your patience.
        </div>
      )}
    </>
  )
}

export default MaintenanceBanner

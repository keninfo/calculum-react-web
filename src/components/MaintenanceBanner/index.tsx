import React from 'react'

import ContractReads from '@/hooks/useContractReads'

function MaintenanceBanner() {
  const { InMaintenance } = ContractReads()

  let status = false
  const data = InMaintenance().data as [boolean, number]
  if (data) {
    status = data[0] as boolean
  }

  // status = true

  return (
    <>
      {status && (
        <div className="hidden w-screen h-fit z-50 bg-carmesi text-white text-center py-2 text-sm | md:block">
          The contract is currently undergoing maintenance. Please allow 15 minutes for the process to complete. Thank
          you for your patience.
        </div>
      )}
    </>
  )
}

export default MaintenanceBanner

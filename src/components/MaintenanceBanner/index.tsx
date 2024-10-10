import React from 'react'

import ContractReads from '@/hooks/useContractReads'

function MaintenanceBanner() {
  const { InMaintenance } = ContractReads()

  let status = false
  const data = InMaintenance().data as [boolean, number]
  if (data) {
    status = data[0] as boolean
  }

  return (
    <>
      {status && (
        <div className="| z-50 hidden h-fit w-full bg-carmesi py-2 text-center text-sm text-white md:block">
          The contract is currently undergoing maintenance. Thank you for your patience.
        </div>
      )}
    </>
  )
}

export default MaintenanceBanner

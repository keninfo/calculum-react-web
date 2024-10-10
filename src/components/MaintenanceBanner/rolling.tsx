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
        <div className="hidden w-full min-h-[34px] z-50 bg-carmesi text-white py-2 text-sm overflow-hidden | md:block">
          <div
            className="relative w-full whitespace-nowrap"
            style={{
              animation: 'marquee 10s linear infinite',
            }}
          >
            <span className="absolute -translate-x-1/2 left-0">
              The contract is currently undergoing maintenance. Thank you for your patience.
            </span>
            <span className="absolute left-1/2 -translate-x-1/2">
              The contract is currently undergoing maintenance. Thank you for your patience.
            </span>
            <span className="absolute translate-x-1/2 right-0">
              The contract is currently undergoing maintenance. Thank you for your patience.
            </span>
            <span className="absolute translate-x-1/2 -right-1/2">
              The contract is currently undergoing maintenance. Thank you for your patience.
            </span>
          </div>

          {/* Keyframes animation */}
          <style jsx>{`
            @keyframes marquee {
              0% {
                transform: translateX(0%);
              }
              100% {
                transform: translateX(-50%);
              }
            }
          `}</style>
        </div>
      )}
    </>
  )
}

export default MaintenanceBanner

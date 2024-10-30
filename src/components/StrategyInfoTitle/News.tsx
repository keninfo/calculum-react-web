import React from 'react'

import ContractReads from '@/hooks/useContractReads'

const newsItems = [
  '"LEAVING TESTNET DECEMBER 2024"',
  '"BITCOIN HITS A NEW TIME HIGH OF 70K"',
  '"NEWS NEWS NEWS"',
  '"INTRODUCING NEW STRATEGY: MOMENTUM"',
]

const maintenanceMessage = [
  '"The contract is currently undergoing maintenance"',
  '"Thank you for your patience"',
  '"The contract is currently undergoing maintenance"',
  '"Thank you for your patience"',
]

const NewsTicker = () => {
  const { InMaintenance } = ContractReads()

  let isMaintenance = false
  const data = InMaintenance().data as [boolean, number]
  if (data) {
    isMaintenance = data[0] as boolean
  }

  return (
    <div className="relative flex h-12 w-full items-center overflow-hidden text-white">
      <div className="absolute inset-y-0 left-0 z-10 w-[10vw] bg-gradient-to-r from-smoke to-transparent"></div>
      <div className="absolute inset-y-0 right-0 z-10 w-[10vw] bg-gradient-to-l from-smoke to-transparent"></div>
      <div className="animate-scroll flex whitespace-nowrap">
        {!isMaintenance &&
          newsItems.map((item, index) => (
            <span key={index} className="mr-4 flex items-center justify-center">
              <span>{item}</span>
              <span className="ml-4">-</span>
            </span>
          ))}
        {/* Duplicate items for seamless looping */}
        {!isMaintenance &&
          newsItems.map((item, index) => (
            <span key={`${index}-duplicate`} className="mr-4 flex items-center justify-center">
              <span>{item}</span>
              <span className="ml-4">-</span>
            </span>
          ))}
        {isMaintenance &&
          maintenanceMessage.map((item, index) => (
            <span key={index} className="mr-4 flex items-center justify-center">
              <span className="font-bold text-[#FF5555]">{item}</span>
              <span className="ml-4">-</span>
            </span>
          ))}
        {/* Duplicate items for seamless looping */}
        {isMaintenance &&
          maintenanceMessage.map((item, index) => (
            <span key={`${index}-duplicate`} className="mr-4 flex items-center justify-center">
              <span className="font-bold text-[#FF5555]">{item}</span>
              <span className="ml-4">-</span>
            </span>
          ))}
      </div>
    </div>
  )
}

export default NewsTicker

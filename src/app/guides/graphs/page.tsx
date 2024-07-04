'use client'

import React from 'react'

import Card from '@/components/common/Card'
import ContractReads from '@/hooks/useContractReads'

const page = () => {
  const { InMaintenance } = ContractReads()

  let status = false

  const data = InMaintenance().data as [boolean, number]
  if (data) {
    status = data[0] as boolean
  }
  return (
    <>
      {' '}
      <div className="col-span-7">
        <Card className="w-full h-full">
          <h2 className="mb-[2vh] text-[4vh] text-carmesi">GRAPHS</h2>
        </Card>
      </div>
      <div className="col-span-2 ">
        <Card className="w-full h-full">
          <p className="text-carmesi mb-[2vh] text-[3vh]">Page content</p>
          <ul className={`text-[2vh] space-y-[2vh] pt-[2vh] sticky ${status ? 'top-[16.5vh]' : 'top-[11.5vh]'}`}></ul>
        </Card>
      </div>
    </>
  )
}

export default page

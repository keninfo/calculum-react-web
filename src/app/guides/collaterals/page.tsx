'use client'

import React from 'react'

import Link from 'next/link'

import CollateralsTable from '@/components/CollateralsTable'
import Card from '@/components/common/Card'
import ContractReads from '@/hooks/useContractReads'

const Page = () => {
  const { InMaintenance } = ContractReads()

  let status = false

  const data = InMaintenance().data as [boolean, number]
  if (data) {
    status = data[0] as boolean
  }

  return (
    <>
      <div className="col-span-7">
        <Card className="w-full h-full">
          <h2 id="collateral" className="mb-[2vh] text-[4vh] text-carmesi scroll-offset">
            {`Collateral's Table`}
          </h2>
          <p className="mb-[2vh]">
            {`The collateral table lets you check and manage your deposited assets. Just click on an asset in the table to view detailed information about it, including its current status and how it's used within the platform.`}
          </p>
          <div className="relative flex justify-center bg-smoke p-[4vh] mb-[2vh]">
            <CollateralsTable />
            <p className="text-xs absolute bottom-[1vh] right-[1vw] text-greySmoke">interactive</p>
          </div>
          <h4 id="whats-next" className="mt-[4vh] mb-[2vh] text-[2.5vh] font-bold scroll-offset">{`What's next`}</h4>
          <p className="my-[1vh]">{`Next, we recommend reviewing the Trade's Table Guide`}</p>
        </Card>
      </div>
      <div className="col-span-2 ">
        <Card className="w-full h-full">
          <p className="text-carmesi mb-[2vh] text-[3vh]">Page content</p>
          <ul className={`text-[2vh] space-y-[2vh] pt-[2vh] sticky ${status ? 'top-[16.5vh]' : 'top-[11.5vh]'}`}>
            <li className="border-t border-greySmoke pt-[2vh]">
              <Link href="#collateral">{`Collateral's Table`}</Link>
            </li>
            <li className="border-t border-greySmoke pt-[2vh]">
              <Link href="#whats-next">{`What's next`}</Link>
            </li>
          </ul>
        </Card>
      </div>
    </>
  )
}

export default Page

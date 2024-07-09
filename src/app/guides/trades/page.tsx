'use client'

import React from 'react'

import Link from 'next/link'

import TradesTable from '@/components/TradesTable'
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
          <h2 id="trade" className="mb-[2vh] text-[4vh] text-carmesi scroll-offset">
            {`Trade's Table`}
          </h2>
          <p className="mb-[2vh]">
            {`The trades table is where you can view your currently deposited assets and monitor their trends. You can also withdraw assets by closing them directly from this table. Switching to the 'close' tab allows you to review all your past transactions within the Bear Protocol platform.`}
          </p>
          <div className="relative flex justify-center bg-smoke p-[4vh] mb-[2vh]">
            <TradesTable />
            <p className="text-xs absolute bottom-[1vh] right-[1vw] text-greySmoke">interactive</p>
          </div>
          <h4 id="whats-next" className="mt-[4vh] mb-[2vh] text-[2.5vh] font-bold scroll-offset">{`What's next`}</h4>
          <p className="my-[1vh]">{`Thats it!  you know everything there is to know, well at least about Bear Protocol. You are ready to dive into the dashboard and start trading some crypto.`}</p>
          <Link href="/dashboard" className="text-xl text-carmesi">
            GO TO DASHBOARD
          </Link>
        </Card>
      </div>
      <div className="col-span-2 ">
        <Card className="w-full h-full">
          <p className="text-carmesi mb-[2vh] text-[3vh]">Page content</p>
          <ul className={`text-[2vh] space-y-[2vh] pt-[2vh] sticky ${status ? 'top-[16.5vh]' : 'top-[11.5vh]'}`}>
            <li className="border-t border-greySmoke pt-[2vh]">
              <Link href="#trade">{`Trades's Table`}</Link>
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

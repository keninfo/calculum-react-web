'use client'

import React from 'react'

import Link from 'next/link'

import VaultsInfo from '@/components/VaultsInfo'
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
          <h2 id="vaults" className="mb-[2vh] text-[4vh] text-carmesi scroll-offset">
            {`Vault's Table`}
          </h2>
          <p className="mb-[2vh]">
            {`The Vaults Table is where you'll find all the current strategies we're running. You can easily
            check out their names, prices, and percentage changes. `}
          </p>
          <p className="mb-[2vh]">
            {`Simply click on any element to dive into that
            specific strategy.`}
          </p>
          <p className="mb-[2vh]">
            You can also use the column titles to sort the strategies in ascending or descending order.
            <br />
            Plus, you can filter strategies using the search bar.
          </p>
          <p className="mb-[6vh]">Feel free to interact with the table below!</p>
          <div className="relative flex justify-center bg-smoke p-[4vh] mb-[2vh]">
            <VaultsInfo />
            <p className="text-xs absolute bottom-[1vh] right-[1vw] text-greySmoke">interactive</p>
          </div>
          <h4 id="whats-next" className="mt-[4vh] mb-[2vh] text-[2.5vh] font-bold scroll-offset">{`What's next`}</h4>
          <p className="my-[1vh]">
            {`Next, we recommend reviewing the Collateral's Table Guide or Trade's Table Guide`}
          </p>
          <ol className="list-disc list-inside">
            <li>
              <Link href="/guides/collaterals" className="text-carmesi">
                {`Collateral's Table`}
              </Link>
            </li>
            <li>
              <Link href="/guides/trades" className="text-carmesi">
                {`Trade's Vault Guide`}
              </Link>
            </li>
          </ol>
        </Card>
      </div>
      <div className="col-span-2 ">
        <Card className="w-full h-full">
          <p className="text-carmesi mb-[2vh] text-[3vh]">Page content</p>
          <ul className={`text-[2vh] space-y-[2vh] pt-[2vh] sticky ${status ? 'top-[16.5vh]' : 'top-[11.5vh]'}`}>
            <li className="border-t border-greySmoke pt-[2vh]">
              <Link href="#vaults">{`Vault's Table`}</Link>
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

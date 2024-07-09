'use client'

import React from 'react'

import Link from 'next/link'

import ActionCard from '@/components/ActionCard'
import Claim from '@/components/Claim'
import Deposit from '@/components/Deposit'
import Withdraw from '@/components/Withdraw'
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
          <h2 id="tradebox" className="mb-[2vh] text-[4vh] text-carmesi scroll-offset">
            {`Trade Box`}
          </h2>
          <p className="mb-[2vh]">
            {`The trade box is where all the action happens. Here, you can directly deposit, claim, or withdraw any assets or shares from the Bear Protocol platform. `}
          </p>
          <p className="mb-[2vh]">
            {` At the top of the trade box, you'll find two dropdowns one to select the strategy and one to select the asset. You will also find the tabs to switch between Deposit, Claim and Withdraw`}
          </p>
          <div className="relative flex justify-center bg-smoke p-[4vh] mb-[2vh] px-[20%] pointer-events-none">
            <ActionCard />
          </div>
          <h3 id="actions" className="my-[4vh] text-[3vh] font-bold">
            Actions
          </h3>
          <p>Like mentioned before, these are three actions you can do within the Trade Box:</p>
          <h4 id="deposit" className="mt-[4vh] mb-[2vh] text-[2.5vh] scroll-offset">
            Deposit
          </h4>
          <p className="mb-[2vh]">
            {`Deposit itself consists of two parts. The first part is the Approve, where you give permission to the Bear
            Protocol contract to access your assets directly from your wallet. You can approve as much or as little as
            you want. (If you don't see the Approve button, it means you have already approved some amount before).`}
          </p>
          <p className="mb-[2vh]">
            Once you have deposited the approved amount, you will need to give permission to use more assets.
          </p>
          <p className="mb-[2vh]">
            If you have already approved some amount, you will now see the option to actually deposit. When you input an
            amount of assets to deposit, you will see how many shares it converts to.
          </p>
          <p className="mb-[2vh]">Other information you will find includes:</p>
          <ol className="list-disc list-inside mb-[2vh]">
            <li>The total amount of the asset available in your wallet.</li>
            <li>The amount of assets pending to be deposited (takes around one epoch).</li>
            <li>The total amount of assets you have ever deposited in this strategy.</li>
          </ol>
          <p className="mb-[4vh]">
            Finally, on top of how many shares you will receive, you will find the button to add the token for the
            shares directly into your wallet.
          </p>
          <div className="relative flex justify-center bg-smoke p-[4vh] mb-[2vh]">
            <Card>
              <Deposit />
            </Card>
            <p className="text-xs absolute bottom-[1vh] right-[1vw] text-greySmoke">interactive</p>
          </div>
          <h4 id="claim" className="mt-[4vh] mb-[2vh] text-[2.5vh] scroll-offset">
            Claim
          </h4>
          <p className="mb-[2vh]">
            {`In Claim, is where you will be taking out your assets or shares from the Bear Protocol and into your wallet. It's really simple: if you have any assets or shares, you will see the corresponding button to do so, alongside how many of each you have.`}
          </p>
          <p className="mb-[2vh]">
            Before being able to claim shares, you have to wait one epoch from the time of deposit. Similarly, before
            being able to claim assets, you have to wait one epoch from the time of withdrawal.
          </p>
          <div className="relative flex justify-center bg-smoke p-[4vh] mb-[2vh]">
            <Card>
              <Claim />
            </Card>
            <p className="text-xs absolute bottom-[1vh] right-[1vw] text-greySmoke">interactive</p>
          </div>
          <h4 id="withdraw" className="mt-[4vh] mb-[2vh] text-[2.5vh] scroll-offset">
            Withdraw
          </h4>
          <p className="mb-[2vh]">
            Withdraw is the more complicated of the three actions, but still easy to understand. This is where you
            convert your shares back into assets to later be claimed in the Claim tab.
          </p>
          <p className="mb-[2vh]">
            {`It's divided into two types of withdrawals: Redeem and Withdraw itself. Basically, both do exactly the same
            thing (convert shares back to assets) but are presented in different formats.`}
          </p>
          <p className="mb-[2vh]">
            Redeem lets you input the amount of shares you want to convert, and it will tell you how many assets it
            converts into.
          </p>
          <p className="mb-[2vh]">
            On the other hand, Withdraw lets you input the amount of assets you want to convert and tells you its
            equivalent in shares.
          </p>
          <p className="mb-[2vh]">Other information you will find includes:</p>
          <ol className="list-disc list-inside mb-[4vh]">
            <li>The total amount of the shares available in your wallet.</li>
            <li>The amount of assets pending to be withdrawn (takes around one epoch).</li>
            <li>The total amount of assets you have ever withdrawn in this strategy.</li>
          </ol>
          <div className="relative flex justify-center bg-smoke p-[4vh] mb-[2vh]">
            <Card>
              <Withdraw />
            </Card>
            <p className="text-xs absolute bottom-[1vh] right-[1vw] text-greySmoke">interactive</p>
          </div>
          <h4 id="whats-next" className="mt-[4vh] mb-[2vh] text-[2.5vh] font-bold scroll-offset">{`What's next`}</h4>
          <p className="my-[1vh]">{`Next, we recommend reviewing the Vaults's Table Guide`}</p>
          <ol className="list-disc list-inside">
            <li>
              <Link href="/guides/vaults" className="text-carmesi">
                {`Vault's Table Guide`}
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
              <Link href="#tradebox">{`Trade Box`}</Link>
            </li>
            <li className="border-t border-greySmoke pt-[2vh]">
              <Link href="#actions">Actions</Link>
            </li>
            <li className="text-xs">
              <Link href="#deposit">Deposit</Link>
            </li>
            <li className="text-xs">
              <Link href="#claim">Claim</Link>
            </li>
            <li className="text-xs">
              <Link href="#withdraw">Withdraw</Link>
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

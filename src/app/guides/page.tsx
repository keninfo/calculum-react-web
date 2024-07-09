'use client'

import React from 'react'

import Link from 'next/link'

import ProToggle from '@/components/Navbar/ProToggle'
import Card from '@/components/common/Card'
import CustomConnectButton from '@/components/common/CustomConnectButton'
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
          <h2 id="started" className="mb-[2vh] text-[4vh] text-carmesi scroll-offset">
            User Guide Overview
          </h2>
          <p className="text-lg">
            {`Welcome to the user-oriented guides for the Bear Protocol Dashboard! These guides are designed to teach you how to use and interact with this dApp. If you're looking for technical documentation, please refer to the`}{' '}
            <Link href="/docs" className="text-carmesi">
              DOCS
            </Link>
            . If you want to learn about trading, crypto, volatility, etc, please check out the{' '}
            <Link href="/learning" className="text-carmesi">
              LEARNING TAB
            </Link>
            . Also, note that this is a work in progress and can change at any minute.
          </p>
          <h3 className="my-[4vh] text-[3vh] font-bold ">Getting Started</h3>
          <p>
            {`What's up, bears! We're so glad you're here to learn more about using Bear Protocol. These guides were created to get new users up to speed quickly and to explain the settings and advanced features of the Bear Protocol Dashboard. As with most things, the best way to get started is to try it out for yourself.`}
          </p>
          <h3 id="top-nav" className="my-[4vh] text-[3vh] font-bold scroll-offset">
            Top Navigation Bar
          </h3>
          <p>
            {`To begin, let's familiarize you with the Navbar at the top of the page. It features three main elements:`}
          </p>
          <h4 id="nav-tabs" className="mt-[4vh] mb-[2vh] text-[2.5vh] scroll-offset">
            Navigation Tabs
          </h4>
          <p>Use them to switch between the different views within Bear Protocol;</p>
          <p className="my-[1vh]">
            The{' '}
            <Link href="/dashboard" className="text-carmesi">
              DASHBOARD
            </Link>{' '}
            is your central hub for managing and monitoring your activities within the Bear Protocol platform.
          </p>
          <p className="mb-[1vh]">
            The{' '}
            <Link href="/docs" className="text-carmesi">
              DOCS
            </Link>{' '}
            contain the technical documentation for Bear Protocol. This is the go-to resource for developers and
            technical users looking to know the ins and outs of the protocol.
          </p>
          <p className="mb-[1vh]">
            The{' '}
            <Link href="/guides" className="text-carmesi">
              GUIDES
            </Link>{' '}
            offer user-oriented tutorials and how-tos designed to help you get the most out of Bear Protocol. These
            guides are perfect for new users as well as those looking to explore advanced features.
          </p>
          <p className="mb-[1vh]">
            The{' '}
            <Link href="/learning" className="text-carmesi">
              LEARNING TAB
            </Link>{' '}
            here, you can learn more about what Bear Protocol is and how the strategies work. Dive into the details and
            enhance your understanding of the platform.
          </p>
          <h4 id="mode-toggle" className="mt-[4vh] mb-[2vh] text-[2.5vh] scroll-offset">
            Mode Toggle Button
          </h4>
          <div className="relative flex justify-center bg-smoke py-[2vh] mb-[2vh]">
            <ProToggle />
            <p className="text-xs absolute bottom-[1vh] right-[1vw] text-greySmoke">interactive</p>
          </div>
          <p className="my-[1vh]">
            It allows you to seamlessly switch between Pro and Classic modes, catering to different user preferences and
            needs. (Go ahead, try it right here!)
          </p>
          <p className="my-[1vh]">
            <b className="text-carmesi">PRO</b>: Tailored for advanced users who require comprehensive tools and
            features.
          </p>
          <p className="my-[1vh]">
            <b className="text-carmesi">CLASSIC</b>: Designed for users who prefer a simplified and streamlined
            interface.
          </p>
          <h4 id="connect-wallet" className="mt-[4vh] mb-[2vh] text-[2.5vh] scroll-offset">
            Connect Wallet Button
          </h4>
          <div className="relative flex justify-center bg-smoke py-[2vh] mb-[2vh]">
            <CustomConnectButton />
            <p className="text-xs absolute bottom-[1vh] right-[1vw] text-greySmoke">interactive</p>
          </div>
          <p className="my-[1vh]">
            The Connect Wallet button allows users to link their cryptocurrency wallet to the Bear Protocol platform.
            This functionality is powered by RainbowKit, ensuring a seamless and user-friendly experience.
          </p>
          <p className="my-[1vh]">
            To use it, simply click on the Connect Wallet button and select your preferred wallet provider. This action
            will open another view with instructions specific to the selected wallet.
          </p>
          <p className="my-[1vh]">
            {`When connected, the button displays a chain logo and your wallet address, abbreviated for security (e.g., 0x12...34AB).`}
          </p>
          <p className="my-[1vh]">By clicking the chain logo, you can switch between different blockchain networks.</p>
          <h4 id="guide-interaction" className="mt-[4vh] mb-[2vh] text-[2.5vh] font-bold scroll-offset">
            Guide Interaction
          </h4>
          <p className="my-[1vh]">
            {`To conclude, we want to draw your attention to the "interactive" tag, which you might have noticed in this guide at the lower right corner of certain sections. Don't hesitate to engage with the elements tagged as "interactive"—exploring these features hands-on is the best way to learn and become familiar with the Bear Protocol platform.`}
          </p>
          <h4 id="whats-next" className="mt-[4vh] mb-[2vh] text-[2.5vh] font-bold scroll-offset">{`What's next`}</h4>
          <p className="my-[1vh]">
            {`Next, we recommend reviewing the Graph Guide to deepen your understanding. If you're eager to start trading right away, head over to the Trade Box Guide.`}
          </p>
          <ol className="list-disc list-inside">
            <li>
              <Link href="/guides/graphs" className="text-carmesi">
                Graph Guide
              </Link>
            </li>
            <li>
              <Link href="/guides/tradebox" className="text-carmesi pointer-events-none">
                Trade Box Guide
              </Link>
            </li>
          </ol>
        </Card>
      </div>
      <div className="col-span-2">
        <Card className="w-full h-full">
          <p className="text-carmesi mb-[2vh] text-[3vh]">Page content</p>
          <ul className={`text-[2vh] space-y-[2vh] pt-[2vh] sticky ${status ? 'top-[16.5vh]' : 'top-[11.5vh]'}`}>
            <li className="border-t border-greySmoke pt-[2vh]">
              <Link href="#started">Getting Started</Link>
            </li>
            <li className="border-t border-greySmoke pt-[2vh]">
              <Link href="#top-nav">Top Navigation Bar</Link>
            </li>
            <li className="text-xs">
              <Link href="#nav-tabs">Navigation Tabs</Link>
            </li>
            <li className="text-xs">
              <Link href="#mode-toggle">Mode Toggle Button</Link>
            </li>
            <li className="text-xs">
              <Link href="#connect-wallet">Connect Wallet Button</Link>
            </li>
            <li className="border-t border-greySmoke pt-[2vh]">
              <Link href="#guide-interaction">Guide Interaction</Link>
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

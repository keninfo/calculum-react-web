'use client'

import Head from 'next/head'
import Link from 'next/link'

import ProToggle from '@/components/Navbar/ProToggle'
import Card from '@/components/common/Card'
import CustomConnectButton from '@/components/common/CustomConnectButton'
import MetaTags from '@/components/common/MetaTags'
import ContractReads from '@/hooks/useContractReads'

const Guides = () => {
  const { InMaintenance } = ContractReads()

  let status = false

  const data = InMaintenance().data as [boolean, number]
  if (data) {
    status = data[0] as boolean
  }
  return (
    <>
      <Head>
        <title key="default-title">Bear Protocol - Guides</title>
        <MetaTags />
      </Head>

      <main
        className={`hidden | md:grid grid-cols-11 h-screen space-x-[1vw] m-0 ${status ? 'mt-[13.5vh]' : 'mt-[8.5vh]'}`}
      >
        <div className="col-span-2">
          <Card className="w-full h-full m-0">
            <p className="text-carmesi mb-[2vh] text-[3vh]">Guides</p>
            <ul className={`text-[2vh] space-y-[2vh] pt-[2vh] sticky ${status ? 'top-[16.5vh]' : 'top-[11.5vh]'}`}>
              <li>Overview</li>
              <li className="text-greySmoke">Deposit</li>
              <li className="text-greySmoke">Claim</li>
              <li className="text-greySmoke">Withdraw</li>
            </ul>
          </Card>
        </div>
        <div className="col-span-7 ">
          <Card className="w-full h-full">
            <h2 className="mb-[2vh] text-[4vh] text-carmesi">User Guide Overview</h2>
            <p>
              {`These are user-oriented guides for the Bear Protocol Dashboard. If you're looking for technical
              documentation, please refer to the`}
              <Link href="/docs" className="text-carmesi">
                docs
              </Link>
              . Also note that this is a work in progress and can change at any minute.
            </p>
            <h3 className="my-[4vh] text-[3vh] font-bold">Getting Started</h3>
            <p>
              {`What's up, bears! We're so glad you're here to learn more about using Bear Protocol. These guides were
              created to get new users up to speed quickly and to explain the settings and advanced features of the Bear
              Protocol Dashboard. As with most things, the best way to get started is to try it out for yourself.`}
            </p>
            <h3 className="my-[4vh] text-[3vh] font-bold">Top Navigation Bar</h3>
            <p>
              {`To begin, let's familiarize you with the Navbar at the top of the page. It features three main elements:`}
            </p>
            <h4 className="mt-[4vh] mb-[2vh] text-[2.5vh]">Navigation Tabs</h4>
            <p>Use them to switch between the different views within Bear Protocol;</p>
            <p className="my-[1vh]">
              The <b className="text-carmesi">DASHBOARD</b> is your central hub for managing and monitoring your
              activities within the Bear Protocol platform.
            </p>
            <p className="mb-[1vh]">
              The <b className="text-carmesi">DOCS</b> section contains the technical documentation for Bear Protocol.
              This is the go-to resource for developers and technical users looking to know the ins and outs of the
              protocol.
            </p>
            <p className="mb-[1vh]">
              The <b className="text-carmesi">GUIDES</b> section offers user-oriented tutorials and how-tos designed to
              help you get the most out of Bear Protocol. These guides are perfect for new users as well as those
              looking to explore advanced features.
            </p>
            <h4 className="mt-[4vh] mb-[2vh] text-[2.5vh]">Mode Toggle Button</h4>
            <div className="relative flex justify-center bg-smoke py-[2vh] mb-[2vh]">
              <ProToggle />
              <p className="text-xs absolute bottom-[1vh] right-[1vw] text-greySmoke">interactive</p>
            </div>
            <p className="my-[1vh]">
              It allows you to seamlessly switch between Pro and Classic modes, catering to different user preferences
              and needs. ( Go Ahead try it right here! )
            </p>
            <p className="my-[1vh]">
              <b className="text-carmesi">PRO</b> is tailored for advanced users who require comprehensive tools and
              features.
            </p>
            <p className="my-[1vh]">
              <b className="text-carmesi">CLASSIC</b> is designed for users who prefer a simplified and streamlined
              interface.
            </p>
            <h4 className="mt-[4vh] mb-[2vh] text-[2.5vh]">Connect Wallet Button</h4>
            <div className="relative flex justify-center bg-smoke py-[2vh] mb-[2vh]">
              <CustomConnectButton />
              <p className="text-xs absolute bottom-[1vh] right-[1vw] text-greySmoke">interactive</p>
            </div>
            <p className="my-[1vh]">
              The Connect Wallet button allows users to link their cryptocurrency wallet to the Bear Protocol platform.
              This functionality is powered by RainbowKit, ensuring a seamless and user-friendly experience.
            </p>
            <p className="my-[1vh]">
              To use it simply click on it and select your preferred wallet provider, this would open another view with
              the instruction specific to the selected wallet
            </p>
            <p className="my-[1vh]">
              By clicking the chain logo, you can switch between different blockchain networks. This feature allows you
              to seamlessly transition between supported chains, ensuring that you can interact with various
              decentralized applications and assets across multiple networks without any hassle.
            </p>
            <p className="my-[1vh]">
              {`If you are already connected, the Connect Wallet button will change to display a chain logo and your
              wallet address. The wallet address will be abbreviated for security and convenience, showing only the
              first four and last four characters (e.g., 0x12...34AB). This visual confirmation ensures that you are
              securely connected and can easily access your wallet's features.`}
            </p>
          </Card>
        </div>
        <div className="col-span-2 ">
          <Card className="w-full h-full ">
            <p className="text-carmesi mb-[2vh] text-[3vh]">Page content</p>
            <ul className={`text-[2vh] space-y-[2vh] pt-[2vh] sticky ${status ? 'top-[16.5vh]' : 'top-[11.5vh]'}`}>
              <li>Getting Started</li>
              <li>Top Navigation Bar</li>
              <li className="text-xs">Navigation Tabs</li>
              <li className="text-xs">Mode Toggle Button</li>
              <li className="text-xs">Connect Wallet Button</li>
            </ul>
          </Card>
        </div>
      </main>
    </>
  )
}

export default Guides

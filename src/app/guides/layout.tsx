'use client'

import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import type { ReactNode } from 'react'
import { useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Card from '@/components/common/Card'
import MetaTags from '@/components/common/MetaTags'
import ContractReads from '@/hooks/useContractReads'

const Guides = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  const { InMaintenance } = ContractReads()
  const [light, setLight] = useState<boolean>(false)

  const pathname = usePathname()

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
        className={`hidden | md:grid grid-cols-11 h-screen space-x-[1vw] m-0 ${status ? 'mt-[13.5vh]' : 'mt-[8.5vh]'} p-[0.5vw] ${light ? 'light' : ''} text-white`}
      >
        <div className="col-span-2">
          <Card className="relative w-full h-full m-0">
            <p className="text-carmesi mb-[2vh] text-[3vh]">Guides</p>
            <ul className={`text-[2vh] space-y-[2vh] pt-[2vh] sticky ${status ? 'top-[16.5vh]' : 'top-[11.5vh]'}`}>
              <li className={`${pathname == '/guides' ? 'text-carmesi' : ' '}`}>
                <Link href={'/guides'}>Overview</Link>
              </li>
              <li className={`${pathname == '/guides/graphs' ? 'text-carmesi' : ' '}`}>
                <Link href={'/guides/graphs'}>Graphs</Link>
              </li>
              <li className={`${pathname == '/guides/tradebox' ? 'text-carmesi' : ' '}`}>
                <Link href={'/guides'}>Trade Box</Link>
              </li>
              <li className={`${pathname == '/guides/vaults' ? 'text-carmesi' : ' '}`}>
                <Link href={'/guides'}>Vaults</Link>
              </li>
              <li className={`${pathname == '/guides/collateral' ? 'text-carmesi' : ' '}`}>
                <Link href={'/guides'}>Collateral</Link>
              </li>
              <li className={`${pathname == '/guides/trades' ? 'text-carmesi' : ' '}`}>
                <Link href={'/guides'}>Trades</Link>
              </li>
              <p className="text-sm text-greySmoke pt-[4vh] mb-[1vh]">Having trouble reading ? </p>
              <button onClick={() => setLight(!light)} className="flex justify-left items-center w-full">
                <p className="text-xs mr-[1vh]"> switch to {light ? 'dark mode' : 'light mode'} </p>
                {light ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
              </button>
            </ul>
          </Card>
        </div>
        {children}
      </main>
    </>
  )
}

export default Guides

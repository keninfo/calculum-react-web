'use client'

import React from 'react'

import Head from 'next/head'
import Link from 'next/link'

import Card from '@/components/common/Card'
import MetaTags from '@/components/common/MetaTags'
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
      <Head>
        <title key="default-title">Bear Protocol - Learning</title>
        <MetaTags />
      </Head>

      <main
        className={`hidden | md:grid grid-cols-11 h-screen space-x-[1vw] m-0 ${status ? 'mt-[13.5vh]' : 'mt-[8.5vh]'} p-[0.5vw] text-white`}
      >
        <div className="col-span-11">
          <Card className="w-full">
            <h1 className="text-2xl text-center">Here you wil find some articles to learn more about Bear Protocol</h1>
            <ol className="flex justify-center items-center px-auto">
              <li className="text-center w-[50%] p-[5vh] space-y-[4vh] my-[4vh]">
                <p className="text-carmesi text-4xl">Volatility Scaling</p>
                <p className="text-justify ">
                  Volatility is the most common risk metric of a stock. The main aim of the volatility targeting
                  technique is to manage the portfolio’s exposure in such a way that the volatility of a portfolio is as
                  close to the target value as possible. In other words, to ensure that the amount of dollar risk
                  remains the same.{' '}
                </p>
                <p className="hover:scale-105">
                  <Link href={'/learning/volatility'} className="mt-[4vh] bg-carmesi px-[2vw] py-[2vh]">
                    Learn More
                  </Link>
                </p>
              </li>
              <li></li>
            </ol>
          </Card>
        </div>
      </main>
    </>
  )
}

export default page

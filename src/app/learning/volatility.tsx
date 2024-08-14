import React, { useContext, useState } from 'react'

import Link from 'next/link'

import { CoinsContext } from '@/components/AppProviders'
import Card from '@/components/common/Card'

import GraphOne from './graphOne'
import GraphThree from './graphThree'
import GraphTwo from './graphTwo'

const Volatility = () => {
  const [startDate, setStartDate] = useState<number>(1630)
  const [endDate, setEndDate] = useState<number>(1720)
  const { dates } = useContext(CoinsContext)

  const incrementDate = (days: number) => {
    if (dates && endDate + days < dates?.length) {
      setStartDate((prevStartDate) => prevStartDate + days)
      setEndDate((prevEndDate) => prevEndDate + days)
    }
  }

  const decreaseDate = (days: number) => {
    if (startDate - days > 0) {
      setStartDate((prevStartDate) => prevStartDate - days)
      setEndDate((prevEndDate) => prevEndDate - days)
    }
  }
  return (
    <>
      <Card className="w-full bg-transparent">
        <p className="text-carmesi text-3xl mx-auto w-fit">Smoothcoin & Volatility Targeting</p>
        <div className="space-y-[2vh] mt-[4vh] w-[60%] mx-auto text-lg">
          <p className="text-justify ">
            Our first product are what we call <b className="text-carmesi">Smoothcoins</b>
          </p>
          <p className="text-justify ">
            {`The math behind "Smoothcoin" is called "Volatility Targeting". There is a significant amount of
            research about it, and we encourage you to`}{' '}
            <Link
              href="https://quantpedia.com/an-introduction-to-volatility-targeting/"
              target="_blank"
              className="text-carmesi underline"
            >
              learn more about it
            </Link>{' '}
            {` . We are the first to bring this technology to an open Defi protocol. With
            Vol Targeting we are converting a volatile asset into one with a “constant” level of risk (or volatility) by
            rebalancing between your token of choice and cash.`}
          </p>
          <p className="text-justify ">But how do we do this?</p>
        </div>
        <ul className="flex justify-around items-start w-[100%] text-left my-[6vh]">
          <Link
            href="#stepOne"
            className="border rounded-lg w-[25%] px-[1vw] py-[1vh] hover:border-carmesi cursor-pointer bg-darkness"
          >
            <h3>
              Step 1 : <br />
              We define the Volatility Targeting, in this case 20%
            </h3>
          </Link>
          <Link
            href="#stepTwo"
            className="border rounded-lg w-[25%] px-[1vw] py-[1vh] hover:border-carmesi cursor-pointer bg-darkness"
          >
            <h3>
              Step 2 : <br />
              We calculate “Actual Volatility” of the asset.
            </h3>
          </Link>
          <Link
            href="#stepThree"
            className="border rounded-lg w-[25%] px-[1vw] py-[1vh] hover:border-carmesi cursor-pointer bg-darkness"
          >
            <h3>
              Step 3 : <br /> We rebalance between the asset and cash.
            </h3>
          </Link>
        </ul>
      </Card>
      <div className="divider" id="stepOne"></div>
      <Card className="mt-[4vh] w-full">
        <h3 className="mb-[6vh] text-2xl font-bold text-center">Step 1: We define the Volatility Targeting</h3>
        <GraphOne startDate={startDate} endDate={endDate} incrementDate={incrementDate} decreaseDate={decreaseDate} />
      </Card>
      <div className="divider" id="stepTwo"></div>
      <Card className="mt-[4vh] w-full">
        <h3 className="mb-[2vh] text-2xl font-bold text-center">Step 2: We calculate “Actual Volatility”</h3>
        <GraphTwo startDate={startDate} endDate={endDate} incrementDate={incrementDate} decreaseDate={decreaseDate} />
      </Card>
      <div className="divider" id="stepThree"></div>
      <Card className="mt-[4vh] w-full">
        <h3 className="mb-[2vh] text-2xl font-bold text-center">
          Step 3: We rebalance the portfolio between the asset and cash
        </h3>
        <GraphThree
          startDate={startDate}
          endDate={endDate}
          incrementDate={incrementDate}
          decreaseDate={decreaseDate}
          rawOnly={false}
        />
      </Card>
    </>
  )
}

export default Volatility

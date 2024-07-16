import React from 'react'

import Card from '@/components/common/Card'

import GraphOne from './graphOne'
import GraphTwo from './graphTwo'

const Volatility = () => {
  return (
    <Card className="w-full">
      <p className="text-carmesi text-3xl">Volatility Scaling</p>
      <div className="flex justify-between items-center space-x-[4vw]">
        <div className="space-y-[2vh] mt-[4vh] text-center w-[50%]">
          <p className="text-justify ">Our first product is a strategy for scaling the volatility of an asset.</p>
          <p className="text-justify ">
            Volatility is the most common risk metric of a stock. The main aim of the volatility targeting technique is
            to manage the portfolio’s exposure in such a way that the volatility is as close to the target value as
            possible.
          </p>
          <p className="text-justify ">
            We will convert a volatile asset into one with a “constant” volatility to help you be in control of your
            risk. We will rebalance between your asset of choice and cash.
          </p>
          <p className="text-justify ">But how do we do this?</p>
        </div>
        <ul className="text-left w-[30%] space-y-[4vh]">
          <li>
            <h3 className="text-xl">Step 1: We define the Volatility Targeting</h3>
          </li>
          <li>
            <h3 className="text-xl">Step 2: We calculate “Actual Volatility”</h3>
          </li>
          <li>
            <h3 className="text-xl">Step 3: We rebalance the portfolio between the asset and cash</h3>
          </li>
        </ul>
      </div>

      <h3 className="my-[6vh] text-2xl font-bold">Step 1: We define the Volatility Targeting</h3>
      <div className="flex justify-center">
        <div className="w-3/5">
          <GraphOne />
        </div>
        <div className="p-[5vw] w-2/5 space-y-[4vh]">
          <p className="text-justify flex items-center">
            <b className="bg-white text-carmesi py-[1vh] px-[1vw] mr-[2vw]">1</b>The volatility of an asset like BTC
            changes significantly. Over a 2-month period it ranged from 40% at its lowest to 80% at its highest
          </p>
          <p className="text-justify flex items-center">
            <b className="bg-carmesi text-white py-[1vh] px-[1vw] mr-[2vw]">2</b>To control volatility, we can define a
            “Target Volatility 20%”. This means that the standard deviation of the daily returns will be 20% over time,
            and not a random number between 40% and 80%
          </p>
        </div>
      </div>
      <h3 className="my-[6vh] text-2xl font-bold">Step 2: We calculate “Actual Volatility”</h3>
      <div className="flex justify-center">
        <div className="w-3/5">
          <GraphTwo />
        </div>
        <div className="p-[5vw] w-2/5 space-y-[4vh]">
          <p className="text-justify flex items-center">
            <b className="bg-carmesi text-white py-[1vh] px-[1vw] mr-[2vw]">1</b>The “Actual Volatility” is the standard
            deviation of the daily returns of BTC over a specific period. In this chart we are assuming a 14 days
            window.
          </p>
          <p className="text-justify flex items-center">
            <b className="bg-white text-carmesi py-[1vh] px-[1vw] mr-[2vw]">2</b>Calculate the average return over these
            14 days.
          </p>
          <p className="text-right">Standard Deviation</p>
          <div className="flex justify-end items-center">
            <ul className="border-r pr-[2vw]">
              <li>Day 1: -%</li>
              <li>Day 2: -%</li>
              <li>...</li>
              <li>Day 13: -%</li>
              <li>Day 14: -%</li>
            </ul>
            <p className="ml-[2vw]"> = 60% = Actual Volatility</p>
          </div>
        </div>
      </div>
      <h3 className="my-[6vh] text-2xl font-bold">Step 3: We rebalance the portfolio between the asset and cash</h3>
      <div className="flex justify-center">
        <div className="w-3/5">
          <GraphTwo show={true} />
        </div>
        <div className="p-[5vw] w-2/5">
          <p className="text-justify flex items-center mb-[4vh]">
            <b className="bg-carmesi text-white py-[1vh] px-[1vw] mr-[2vw]">1</b>Volatility target = 20%.
          </p>
          <p className="text-justify flex items-center mb-[2vh]">
            <b className="bg-white text-carmesi py-[1vh] px-[1vw] mr-[2vw]">2</b>Calculate Actual Volatility on a
            specific day rebalancing the following way:
          </p>
          <p className="text-left">if target volatility = 20%</p>
          <p className="text-left">and actual volatility today = 60%, then...</p>
          <p className="text-left mt-[2vh]">target volatility / actual volatility = rebalanced</p>
          <p className="text-left mt-[2vh]">20/60 = 33%</p>
          <p className="text-left mt-[2vh] text-carmesi">we then invest 33% BTC and 77% Cash</p>
        </div>
      </div>
    </Card>
  )
}

export default Volatility

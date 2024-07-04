'use client'

import React, { useContext, useEffect, useState } from 'react'

import Link from 'next/link'

import { OptionsContext } from '@/components/AppProviders'
import ChartOptions from '@/components/ChartOptions/Index'
import RoC from '@/components/ChartsContainer/Charts/RoC'
import RollingVol from '@/components/ChartsContainer/Charts/RollingVol'
import Card from '@/components/common/Card'
import ContractReads from '@/hooks/useContractReads'
import { OHCL } from '@/public/ohcl'

import * as d3 from 'd3'
import { timeParse } from 'd3-time-format'

const parseDate = timeParse('%Y-%m-%d')
const formatTime = d3.utcFormat('%B %d, %Y')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseData = (data: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((obj: any) => {
    const { ['']: dateString, ...rest } = obj
    const date = dateString ? parseDate(dateString) : null
    const formattedDate = date ? formatTime(date) : null
    return { date: formattedDate, ...rest }
  })
}

const Page = () => {
  const { InMaintenance } = ContractReads()
  const [prices, setPrices] = useState<number[][]>([])
  const [dates, setDates] = useState<Date[]>([])
  const { coin, setVolatility } = useContext(OptionsContext)

  let status = false

  const data = InMaintenance().data as [boolean, number]
  if (data) {
    status = data[0] as boolean
  }

  const fetchDaily = async () => {
    try {
      let dailyData = await d3.csv('/daily_prices_for_jesus.csv')
      dailyData = parseData(dailyData)

      const coins = Object.keys(dailyData[0]).filter((key) => key !== 'date')
      const dates = dailyData.map((obj) => obj.date).filter((date) => date !== null) as unknown as Date[]

      const arrayOfArrays = coins.map((coin) => {
        const prices = dailyData.map((obj) => parseFloat(obj[coin]) || 0)
        return prices
      })

      // const coinNames: string[] = dailyData.reduce<string[]>((acc, obj) => {
      //   const keys = Object.keys(obj).filter((key) => key !== 'date')
      //   return [...acc, ...keys]
      // }, [])

      // const uniqueCoinNames = Array.from(new Set(coinNames))

      // setCoins(uniqueCoinNames.map((coin) => coin.slice(0, -4)))
      setDates(dates)
      setPrices(arrayOfArrays)
    } catch (error) {
      console.error('Error fetching data :', error)
    }
  }

  useEffect(() => {
    fetchDaily()
  }, [])

  const getCoinArray = (amount: number) => {
    let index = 0
    if (coin == 'PEPE') {
      index = 14
      setVolatility(0.6)
    }
    if (coin == 'ETH') {
      index = 1
      setVolatility(0.3)
    }
    if (coin == 'BTC - High Vol') {
      setVolatility(0.6)
    }
    if (coin == 'BTC - Controlled Vol') {
      setVolatility(0.2)
    }
    return prices[index].slice(-amount)
  }

  const getOHCL = () => {
    let index = 0
    if (coin == 'PEPE') {
      index = 2
    }
    if (coin == 'ETH') {
      index = 1
    }
    return OHCL[index]
  }
  return (
    <>
      <div className="col-span-7">
        <Card className="w-full h-full">
          <h2 id="graphs" className="mb-[2vh] text-[4vh] text-carmesi scroll-offset">
            Graphs
          </h2>
          <p>
            Bear Protocol features three types of graphs: the RoC (Return on Capital) graph, which provides insights
            into the profitability and performance of investments over time; the volatility graph, which illustrates the
            price fluctuations and market stability; and the candlestick price graph, currently disabled, which
            typically offers detailed information about price movements and trends in the market.
          </p>
          <p id="roc" className="font-bold text-[3vh] my-[4vh] scroll-offset">
            RoC (Return on Capital)
          </p>
          <p className="mb-[4vh]">
            provides insights into the profitability and performance of investments over time. It features two lines:
            one representing the RoC of the raw price in white, and the other representing the RoC with volatility
            scaled (our strategy) in red. The graph consistently starts at a value of 1, which corresponds to 100%, and
            fluctuates from that baseline. An increase to 1.3 signifies a return on capital of 30%, while a decrease to
            0.9 indicates a return on capital of -10%.
          </p>
          {prices.length > 0 && (
            <>
              <RoC dates={dates} seriesData1={getCoinArray(0)} seriesData2={getCoinArray(0)} ohcl={getOHCL()} />
            </>
          )}
          <p id="rolling-volatility" className="font-bold text-[3vh] mt-[6vh] mb-[4vh] scroll-offset">
            Rolling Volatility
          </p>
          <p className="mt-[6vh] mb-[4vh]">
            {`Provides the rolling volatility of an asset, offering insights into the asset's price fluctuations over
            time. Rolling volatility measures the variability in an asset's price movement across sequential time
            periods, typically represented as a percentage. It starts at 0%, indicating no volatility, and depicts
            positive percentages to indicate the degree of price fluctuation experienced over each period. This metric
            helps investors and traders assess the risk associated with holding the asset, with higher percentages
            reflecting greater price variability.`}{' '}
            <b className="text-carmesi">Only in Pro Mode</b>
          </p>
          <div className="h-fit">
            {prices.length > 0 && (
              <>
                <RollingVol dates={dates} seriesData={getCoinArray(0)} />
              </>
            )}
          </div>
          <p id="graph-options" className="font-bold text-[3vh] mt-[6vh] mb-[4vh] scroll-offset">
            Graph Options
          </p>
          <p>
            Next to the graphs on the dashboard, you will find the chart options panel. Use this panel to adjust various
            parameters for calculating the charts. The available options, in sequence, are:
          </p>
          <ul className="list-disc list-inside space-y-[2vh] my-[4vh]">
            <li>
              <b>Select the Asset:</b> Use the dropdown menu to choose the asset you want to analyze. This will update
              the chart with the relevant data for the selected asset.
            </li>
            <li>
              <b>View Case Studies:</b> Select from different case studies to see specific analysis and data for various
              scenarios.
            </li>
            <li>
              <b>Set Analysis Window:</b>{' '}
              {`Choose the time window for your analysis. This option can only be modified
              when "Case studies" is set to "Select timeframe"`}
            </li>
            <li>
              <b>Monitor Volatility:</b> In <b className="text-carmesi">Pro</b> mode, view the volatility percentage of
              the selected asset over the chosen rolling window period.
            </li>
            <li>
              <b>Review Rolling Window:</b> In <b className="text-carmesi">Pro</b> mode, see the number of days set for
              the rolling window to understand the volatility analysis better.
            </li>
          </ul>
          <p className="my-[4vh]">Go ahead a try them, you will see the changes reflected in the charts above:</p>

          <div className="relative flex justify-center bg-smoke py-[2vh] ">
            <div className="w-[50%]">
              <ChartOptions prices={prices} guide={true} />
            </div>
            <p className="text-xs absolute bottom-[1vh] right-[1vw] text-greySmoke">interactive</p>
          </div>
          <p id="graph-interaction" className="font-bold text-[3vh] mt-[6vh] mb-[4vh] scroll-offset">
            Graph Interaction
          </p>
          <p className="mb-[4vh]">
            Currently, the only interaction with the graphs is through tooltips, as you may have observed by hovering
            over the graph lines above. In the future, we plan to introduce additional features such as zooming,
            panning, and drawing on the graphs.
          </p>
          <h4 id="whats-next" className="mt-[4vh] mb-[2vh] text-[2.5vh] font-bold scroll-offset">{`What's next`}</h4>
          <p className="my-[1vh]">
            {`Next, we recommend reviewing the Trade Box Guide to learn how to start Depositing/Claiming/Withdrawing. If you're not ready to start trading
            yet, head over to the Vaults Guide.`}
          </p>
          <ol className="list-disc list-inside">
            <li>
              <Link href="/guides/tradebox" className="text-carmesi">
                Trade Box Guide
              </Link>
            </li>
            <li>
              <Link href="/guides/vaults" className="text-carmesi pointer-events-none">
                Vaults Guide
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
              <Link href="#graphs">Graphs</Link>
            </li>
            <li className="text-xs">
              <Link href="#roc">RoC (Return on Capital)</Link>
            </li>
            <li className="text-xs">
              <Link href="#rolling-volatility">Rollin Volatility</Link>
            </li>
            <li className="border-t border-greySmoke pt-[2vh]">
              <Link href="#graph-options">Graph Options</Link>
            </li>
            <li className="border-t border-greySmoke pt-[2vh]">
              <Link href="#graph-interaction">Graph Interaction</Link>
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react'

import { Tab } from '@mui/base/Tab'
import { TabPanel } from '@mui/base/TabPanel'
import { Tabs } from '@mui/base/Tabs'
import { TabsList } from '@mui/base/TabsList'

import { CoinContext } from '@/components/AppProviders'
import Chart from '@/components/Chart/Index'
import CoinSelect from '@/components/ChartOptions/CoinSelect/Index'
import ChartOptions from '@/components/ChartOptions/Index'
import Deposit from '@/components/Deposit/index'
import Card from '@/components/common/Card'

import Products from './Products/index'
import Stats from './Stats/index'

import * as d3 from 'd3'
import { timeParse } from 'd3-time-format'

const parseDate = timeParse('%Y-%m-%d')
const formatTime = d3.utcFormat('%B %d, %Y')

const parseData = (data: any) => {
  return data.map((obj: any) => {
    const { ['']: dateString, ...rest } = obj
    const date = dateString ? parseDate(dateString) : null
    const formattedDate = date ? formatTime(date) : null
    return { date: formattedDate, ...rest }
  })
}

const Home = () => {
  const { coin } = useContext(CoinContext)
  const [daily, setDaily] = useState<number[][]>([])
  const [dailyDates, setDailyDates] = useState<Date[]>([])
  const [dailyCoins, setDailyCoins] = useState<string[]>([])

  const [start] = useState<Date>(new Date('2020-01-01'))
  const [end] = useState<Date>(new Date())
  const [days] = useState<number>(2)
  const [volatility] = useState<number>(0.1)

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

      const coinNames: string[] = dailyData.reduce<string[]>((acc, obj) => {
        const keys = Object.keys(obj).filter((key) => key !== 'date')
        return [...acc, ...keys]
      }, [])

      const uniqueCoinNames = Array.from(new Set(coinNames))

      setDailyCoins(uniqueCoinNames.map((coin) => coin.slice(0, -4)))
      setDailyDates(dates)
      setDaily(arrayOfArrays)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchDaily()
  }, [])

  const getCoinArray = () => {
    const index = dailyCoins.indexOf(coin)
    if (daily) {
      return daily[index]
    }
    return [] // or handle the case when daily is undefined
  }

  return (
    <>
      <div className="relative grid grid-cols-12 gap-10">
        <div className="col-span-7">
          <h1 className="text-4xl">Overview</h1>
          <div className="h-[50vh] pt-10">
            {false && <ChartOptions coins={dailyCoins} />}
            <CoinSelect coins={['ADA', 'USDC', 'BTC', 'ETH', 'FIL', 'SOL']} />
            <Chart
              period={[start, end]}
              dates={dailyDates}
              prices={getCoinArray()}
              window={days}
              volatility={volatility}
              selectedCoin={coin}
              hourly={false}
            />
          </div>
          <Stats></Stats>
        </div>
        <div className="col-span-5">
          <Card>
            <div className="h-[50vh]">
              <Tabs defaultValue={0}>
                <TabsList className="flex justify-between text-lg px-4">
                  <Tab
                    slotProps={{
                      root: ({ selected }) => ({
                        className: `${selected ? 'text-carmesi hover:text-white' : 'text-white hover:text-carmesi'} pb-4
                          `,
                      }),
                    }}
                    value={0}
                  >
                    DEPOSIT
                  </Tab>
                  <Tab
                    slotProps={{
                      root: ({ selected }) => ({
                        className: `${
                          selected ? 'text-carmesi  hover:text-white' : 'text-white hover:text-carmesi'
                        } pb-4
                          `,
                      }),
                    }}
                    value={1}
                  >
                    CLAIM
                  </Tab>
                  <Tab
                    slotProps={{
                      root: ({ selected }) => ({
                        className: `${
                          selected ? 'text-carmesi  hover:text-white' : 'text-white hover:text-carmesi'
                        } pb-4
                          `,
                      }),
                    }}
                    value={2}
                  >
                    WITHDRAW
                  </Tab>
                </TabsList>
                <TabPanel value={0} className="text-center">
                  <Deposit />
                </TabPanel>
                <TabPanel value={1} className="border-2 border-white mt-5 text-center">
                  CLAIM {coin} COMPONENT
                </TabPanel>
                <TabPanel value={2} className="border-2 border-white mt-5 text-center">
                  WITHDRAW {coin} COMPONENT
                </TabPanel>
              </Tabs>
            </div>
          </Card>
        </div>
        <div className="col-span-7 border-carmesi ">
          <Products></Products>
        </div>
        <div className="col-span-5">
          <Card>
            <div className="h-[50vh]">
              <div className="flex justify-between">
                <h4 className="text-3xl mb-4">{coin.toUpperCase()}</h4>
                <img
                  src={`https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/${coin.toLowerCase()}.svg`}
                  alt="coin icon"
                  className="size-[2rem]"
                ></img>
              </div>

              <h5 className="text-xl text-carmesi">TVL & Traders</h5>
              <p className="mb-4"> Lorem ipsum</p>
              <h5 className="text-xl text-carmesi">Product Description</h5>
              <p className="mb-4">
                {' '}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos porro veniam maiores soluta quam.
                Corporis animi expedita repellendus molestias ratione, possimus nobis iste dolore eligendi veritatis ad
                assumenda earum! Debitis
              </p>
              <h5 className="text-xl text-carmesi">Risk</h5>
              <p className="mb-4">
                {' '}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos porro veniam maiores soluta quam.
                Corporis animi expedita repellendus molestias ratione, possimus nobis iste dolore eligendi veritatis ad
                assumenda earum! Debitis.
              </p>
              <div className="flex start items-center">
                <h5 className="text-xl text-carmesi">Orders made in the past</h5>
                <p className="text-3xl ml-4">0</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Home

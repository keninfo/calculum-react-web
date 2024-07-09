/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react'

import { useAccount } from 'wagmi'

import ActionCard from '@/components/ActionCard'
import ChartsContainer from '@/components/ChartsContainer/Index'
import CollateralsTable from '@/components/CollateralsTable'
import TradesTable from '@/components/TradesTable'
import VaultsInfo from '@/components/VaultsInfo'
import Card from '@/components/common/Card'
import ContractReads from '@/hooks/useContractReads'

import { ProContext } from '../AppProviders'
import ChartOptions from '../ChartOptions/Index'
import RebalancingResults from '../RebalancingResults'
import { PrimaryButton } from '../common/Buttons'
import CustomConnectButton from '../common/CustomConnectButton'
import Modal from '../common/Modal'

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
  const { InMaintenance } = ContractReads()
  const [prices, setPrices] = useState<number[][]>([])
  const [dates, setDates] = useState<Date[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [defaultValue, setDefaultValue] = useState<number>(0)
  const { pro } = useContext(ProContext)
  const { isConnected } = useAccount()
  // const [coins, setCoins] = useState<string[]>([])

  let status = false

  const data = InMaintenance().data as [boolean, number]
  if (data) {
    status = data[0] as boolean
  }

  const fetchDaily = async () => {
    const target = `https://bear-protocol-ux.s3.ap-northeast-1.amazonaws.com/daily_prices_for_jesus.csv`
    try {
      let dailyData = await d3.csv(target)
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

  const toggleModal = (value: number) => {
    setOpen((prevOpen) => !prevOpen)
    setDefaultValue(value)
  }

  return (
    <>
      {/* DESKTOP */}
      <div className={`hidden | md:grid grid-cols-11 ${status ? 'mt-[13.5vh]' : 'mt-[8.5vh]'}`}>
        <div className={`p-[.5vw]  col-span-8`}>
          {prices.length > 0 ? (
            <ChartsContainer prices={prices} dates={dates} />
          ) : (
            <Card className="w-full h-full flex justify-center pt-[15vh]" title="LOADING...">
              <></>
            </Card>
          )}
          <Card className=" flex justify-between w-full mt-[2vh]">
            <CollateralsTable />
            <TradesTable />
          </Card>
          <VaultsInfo />
        </div>
        <div className="p-[.5vw] col-span-3">
          {prices.length > 0 ? (
            <>
              <ChartOptions prices={prices} />
              <ActionCard />
            </>
          ) : (
            <Card className="w-full h-full flex justify-center pt-[15vh]" title="LOADING...">
              <></>
            </Card>
          )}
        </div>
      </div>

      {/* MOBILE */}
      <div className="block w-screen overflow-x-hidden mt-[10vh] space-y-[3vh] pb-[20vh] | md:hidden ">
        {prices.length > 0 ? (
          <ChartsContainer prices={prices} dates={dates} />
        ) : (
          <Card className="w-full h-full flex justify-center" title="LOADING...">
            <></>
          </Card>
        )}
        {pro && <RebalancingResults data={prices} />}
        <Card>
          <TradesTable />
        </Card>
        <VaultsInfo />
        <Card>
          <CollateralsTable />
        </Card>

        <div className="fixed bottom-0 left-0 w-screen z-50 flex justify-around p-[2vh] bg-smoke space-x-1">
          {!isConnected && <CustomConnectButton />}
          {isConnected && (
            <>
              <PrimaryButton handleClick={() => toggleModal(0)} className="bg-opacity-0">
                <p className="font-bold">DEPOSIT</p>
              </PrimaryButton>
              <PrimaryButton handleClick={() => toggleModal(1)} className="bg-opacity-0">
                <p className="font-bold">CLAIM</p>
              </PrimaryButton>
              <PrimaryButton handleClick={() => toggleModal(2)} className="bg-opacity-0">
                <p className="font-bold">WITHDRAW</p>
              </PrimaryButton>
              {open && (
                <Modal onClose={() => toggleModal(0)}>
                  <ActionCard defaultValue={defaultValue} />
                </Modal>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Home

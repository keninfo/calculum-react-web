import { useContext } from 'react'

import { Tab } from '@mui/base/Tab'
import { TabPanel } from '@mui/base/TabPanel'
import { Tabs } from '@mui/base/Tabs'
import { TabsList } from '@mui/base/TabsList'

import { CoinContext } from '@/components/AppProviders'
import CoinSelect from '@/components/ChartOptions/CoinSelect/Index'
import Card from '@/components/common/Card'

import Products from './Products/index'
import Stats from './Stats/index'

const Home = () => {
  const { coin } = useContext(CoinContext)
  return (
    <>
      <div className="relative grid grid-cols-12 gap-10">
        <div className="col-span-7">
          <h1 className="text-4xl">Overview</h1>
          <div className="h-[50vh] pt-10">
            <CoinSelect coins={['ADA', 'USDC', 'BTC', 'ETH', 'FIL', 'SOL']} />
          </div>

          <Stats></Stats>
        </div>
        <div className="col-span-5">
          <Card>
            <div className="h-[50vh]">
              <Tabs defaultValue={0}>
                <TabsList className="flex justify-center text-lg space-x-10">
                  <Tab value={0} className="hover:text-carmesi">
                    DEPOSIT
                  </Tab>
                  <Tab value={1} className="border-x-2 border-white px-10 hover:text-carmesi">
                    CLAIM
                  </Tab>
                  <Tab value={2} className="hover:text-carmesi">
                    WITHDRAW
                  </Tab>
                </TabsList>
                <TabPanel value={0}>My account page</TabPanel>
                <TabPanel value={1}>Profile page</TabPanel>
                <TabPanel value={2}>Language page</TabPanel>
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
              <div className="flex justify-start">
                <h4 className="text-3xl">{coin.toUpperCase()}</h4>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Home

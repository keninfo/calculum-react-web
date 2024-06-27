import React from 'react'

import { Tab } from '@mui/base/Tab'
import { TabPanel } from '@mui/base/TabPanel'
import { Tabs } from '@mui/base/Tabs'
import { TabsList } from '@mui/base/TabsList'

import { useAccount } from 'wagmi'

import CoinSelect from '@/components/ChartOptions/CoinSelect'
import Claim from '@/components/Claim'
import Deposit from '@/components/Deposit'
import Withdraw from '@/components/Withdraw'
import Card from '@/components/common/Card'
import ContractReads from '@/hooks/useContractReads'
import { shortenAddress } from '@/utils/formatters'

import Select from '../common/Select'
import NotWhitelist from './NotWhitelist'

const actions = ['DEPOSIT', 'CLAIM', 'WITHDRAW']

const ActionCard = ({ defaultValue = 0 }: { defaultValue?: number }) => {
  const { address, isConnected } = useAccount()
  const { CheckWhitelist } = ContractReads()

  const whitelistCheck = CheckWhitelist(address).data as boolean

  const ActionTab = ({ tab, index }: { tab: string; index: number }) => {
    return (
      <Tab
        slotProps={{
          root: ({ selected }) => ({
            className: `${selected ? 'text-carmesi hover:text-white font-bold' : 'text-white hover:text-carmesi'}`,
          }),
        }}
        value={index}
      >
        <p className="text-lg | md:text-[1vw]">{tab}</p>
      </Tab>
    )
  }

  const ActionCardTabs = () => {
    return (
      <Tabs defaultValue={defaultValue}>
        <TabsList className="w-min flex justify-between space-x-[6vw] mx-auto | md:space-x-[2vw]">
          {actions.map((tab, index) => ActionTab({ tab, index }))}
        </TabsList>
        <TabPanel value={0} className="text-center">
          <Deposit />
        </TabPanel>
        <TabPanel value={1} className="text-center">
          <Claim />
        </TabPanel>
        <TabPanel value={2} className="text-center">
          <Withdraw />
        </TabPanel>
      </Tabs>
    )
  }

  return (
    <Card className="w-full h-fit max-h-full">
      <div className="flex w-full mb-[4vh] space-x-2">
        <Select handleChange={() => {}} value={'USDC vol'} options={['USDC vol']} />
        <CoinSelect />
      </div>
      <div className="h-fit">
        {isConnected && whitelistCheck && <ActionCardTabs />}
        {isConnected && !whitelistCheck && <NotWhitelist />}
        {!isConnected && <p className="text-2xl text-carmesi mx-auto text-center">Connect a wallet to start trading</p>}
      </div>
      {isConnected && (
        <p className="text-white text-center opacity-50 my-[2vh] border-2 border-white px-[2vw] py-[1vh] text-md | md:text-[.8vw]">
          {shortenAddress(address)}
        </p>
      )}
    </Card>
  )
}

export default ActionCard

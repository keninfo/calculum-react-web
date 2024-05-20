import React from 'react'

import { Tab } from '@mui/base/Tab'
import { TabPanel } from '@mui/base/TabPanel'
import { Tabs } from '@mui/base/Tabs'
import { TabsList } from '@mui/base/TabsList'

import Card from '@/components/common/Card'

import Claim from './Claim'
import Deposit from './Deposit'
import Withdraw from './Withdraw'

const actions = ['DEPOSIT', 'CLAIM', 'WITHDRAW']

const ActionCard = () => {
  const ActionTab = ({ tab, index }: { tab: string; index: number }) => {
    return (
      <Tab
        slotProps={{
          root: ({ selected }) => ({
            className: `${selected ? 'text-carmesi hover:text-white' : 'text-white hover:text-carmesi'}`,
          }),
        }}
        value={index}
      >
        <p className="text-[1vw]">{tab}</p>
      </Tab>
    )
  }
  const ActionCardTabs = () => {
    return (
      <Tabs defaultValue={0}>
        <TabsList className="w-min flex justify-between space-x-[2vw] mx-auto">
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
    <Card>
      <div className="h-fit w-[20vw]">
        <ActionCardTabs />
      </div>
    </Card>
  )
}

export default ActionCard

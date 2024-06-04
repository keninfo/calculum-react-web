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
import ConnectButton from '@/components/common/ConnectButton'
import ContractReads from '@/hooks/useContractReads'
import { shortenAddress } from '@/utils/formatters'

import NotWhitelist from './NotWhitelist'

const actions = ['DEPOSIT', 'CLAIM', 'WITHDRAW']

const ActionCard = ({ coins }: { coins: string[] }) => {
  const { address, isConnected } = useAccount()
  const { CheckWhitelist } = ContractReads()

  const whitelistCheck = CheckWhitelist(address).data as boolean

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
    <Card className="w-full h-full">
      <div className="flex w-full mb-[4vh] space-x-2">
        <p className="border rounded-xl py-0.5 w-full text-center">Strategy</p>
        <CoinSelect coins={coins} />
      </div>
      <div className="h-fit">
        {isConnected && whitelistCheck && <ActionCardTabs />}
        {isConnected && !whitelistCheck && <NotWhitelist />}
        {!isConnected && <ConnectButton />}
      </div>
      {isConnected && (
        <p className="text-white text-[.8vw] text-center opacity-50 my-[2vh] border-2 border-white rounded-lg px-[2vw] py-[1vh]">
          {shortenAddress(address)}
        </p>
      )}
    </Card>
  )
}

export default ActionCard

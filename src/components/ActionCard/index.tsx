import React from 'react'

import { Tab } from '@mui/base/Tab'
import { TabPanel } from '@mui/base/TabPanel'
import { Tabs } from '@mui/base/Tabs'
import { TabsList } from '@mui/base/TabsList'

import type { Hash } from 'viem'

import { useAccount, useReadContract } from 'wagmi'

import Card from '@/components/common/Card'
import ConnectButton from '@/components/common/ConnectButton'
import { calculumVaultContract } from '@/contracts/calculumVault'
import { usdcContract } from '@/contracts/usdc'
import { shortenAddress } from '@/utils/formatters'

import Claim from './Claim'
import Deposit from './Deposit'
import NotWhitelist from './NotWhitelist'
import Withdraw from './Withdraw'

const actions = ['DEPOSIT', 'CLAIM', 'WITHDRAW']

const ActionCard = () => {
  const { address, isConnected } = useAccount()
  let whitelisted = true

  const checkWhitelist = useReadContract({
    abi: calculumVaultContract.abi,
    address: calculumVaultContract.address as Hash,
    functionName: 'whitelist',
    args: [address],
  })

  const { data: symbolAsset } = useReadContract({
    abi: usdcContract.abi,
    address: usdcContract.address as Hash,
    functionName: 'symbol',
  })

  const { data: symbolShares } = useReadContract({
    abi: calculumVaultContract.abi,
    address: calculumVaultContract.address as Hash,
    functionName: 'symbol',
  })

  whitelisted = checkWhitelist.data as boolean

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
          <Deposit symbolAsset={symbolAsset as string} symbolShares={symbolShares as string} />
        </TabPanel>
        <TabPanel value={1} className="text-center">
          <Claim />
        </TabPanel>
        <TabPanel value={2} className="text-center">
          <Withdraw symbolAsset={symbolAsset as string} symbolShares={symbolShares as string} />
        </TabPanel>
      </Tabs>
    )
  }
  return (
    <Card>
      <div className="h-fit w-[20vw]">
        {isConnected && whitelisted && <ActionCardTabs />}
        {isConnected && !whitelisted && <NotWhitelist />}
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

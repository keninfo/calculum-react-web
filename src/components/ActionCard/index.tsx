import React, { useContext } from 'react'

import Link from 'next/link'

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

import { OptionsContext } from '../AppProviders'
import NotWhitelist from './NotWhitelist'

const actions = ['DEPOSIT', 'CLAIM', 'WITHDRAW']

const ActionCard = ({ defaultValue = 0 }: { defaultValue?: number }) => {
  const { address, isConnected } = useAccount()
  const { CheckWhitelist, BalanceAssets } = ContractReads()
  const { coin, setCoin } = useContext(OptionsContext)

  const whitelistCheck = CheckWhitelist(address).data as boolean
  const balanceAssets = BalanceAssets(address).data as bigint

  const ActionTab = ({ tab, index }: { tab: string; index: number }) => {
    return (
      <Tab
        slotProps={{
          root: ({ selected }) => ({
            className: `${selected ? 'text-carmesi hover:text-white font-bold' : 'text-white hover:text-carmesi'}`,
          }),
        }}
        value={index}
        key={index}
      >
        <p className="| text-lg md:text-[1vw]">{tab}</p>
      </Tab>
    )
  }

  const ActionCardTabs = () => {
    return (
      <Tabs defaultValue={defaultValue}>
        <TabsList className="| mx-auto flex w-min justify-between space-x-[6vw] md:space-x-[2vw]">
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
    <Card className="h-fit max-h-full w-full">
      <div className="mb-[4vh] flex justify-center space-x-[1vw]">
        <p>Product: </p>
        <CoinSelect />
      </div>
      {coin === 'BTC Smoothcoin' ? (
        <div className="h-fit">
          {isConnected && whitelistCheck && balanceAssets > 0 && <ActionCardTabs />}
          {isConnected && !whitelistCheck && <NotWhitelist />}
          {isConnected && whitelistCheck && balanceAssets <= 0 && (
            <div className="text-center">
              <p className="mb-[2vh]">
                You have <b className="text-carmesi">0 USDC</b> in your wallet
              </p>
              <p>
                <b className="text-carmesi">$Bear</b> in mind you are in testnet and can mint any amount of tokens you
                want in our faucet.
              </p>
              <p className="text-md my-4 rounded-md bg-carmesi py-[1vh] text-center text-white hover:scale-105">
                <Link href={'/faucet'}>Go To Faucet</Link>
              </p>
            </div>
          )}
          {!isConnected && (
            <p className="mx-auto text-center text-xl text-carmesi">
              Connect a wallet to start trading and see your positions
            </p>
          )}
        </div>
      ) : (
        <p className="mb-[4vh] text-center font-bold">
          Only{' '}
          <b className="mx-1 cursor-pointer text-carmesi hover:scale-105" onClick={() => setCoin('BTC Smoothcoin')}>
            BTC Smoothcoin
          </b>{' '}
          available at the moment
        </p>
      )}
      {isConnected && (
        <p className="text-md | my-[2vh] rounded-lg border-2 border-white px-[2vw] py-[1vh] text-center text-white opacity-50 md:text-[.8vw]">
          {shortenAddress(address)}
        </p>
      )}
    </Card>
  )
}

export default ActionCard

'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import React, { useContext, useState } from 'react'

import { useAccount } from 'wagmi'

import ActionCard from '@/components/ActionCard'
import { CoinsContext, ProContext } from '@/components/AppProviders'
import ChartOptions from '@/components/ChartOptions/Index'
import ChartsContainer from '@/components/ChartsContainer/Index'
import CollateralsTable from '@/components/CollateralsTable'
import Positions from '@/components/Positions'
import RebalancingResults from '@/components/RebalancingResults'
import VaultsInfo from '@/components/StrategyInfoTitle'
import StrategyInfoTitle from '@/components/StrategyInfoTitle'
import StrategyOptions from '@/components/StrategyOptions/Index'
import TradeBox from '@/components/TradeBox'
import Transactions from '@/components/Transactions'
import { AlternateButton } from '@/components/common/Buttons'
import Card from '@/components/common/Card'
import CustomConnectButton from '@/components/common/CustomConnectButton'
import Modal from '@/components/common/Modal'

const Dashboard = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [defaultValue, setDefaultValue] = useState<number>(0)
  const { pro } = useContext(ProContext)
  const { dates, values } = useContext(CoinsContext)
  const { isConnected } = useAccount()
  const [parent1] = useAutoAnimate()
  const [parent2] = useAutoAnimate()

  const toggleModal = (value: number) => {
    setOpen((prevOpen) => !prevOpen)
    setDefaultValue(value)
  }
  return (
    <>
      {/* DESKTOP */}
      <div className={`mt-[11.5vh] hidden grid-cols-11 gap-4 md:grid`}>
        <div className={`col-span-11 flex flex-col gap-4`}>
          <StrategyOptions />
          <StrategyInfoTitle />
        </div>
        <div className={`col-span-8 flex flex-col gap-4`} ref={parent1}>
          {values && dates ? (
            <ChartsContainer />
          ) : (
            <Card className="flex w-full justify-center" title="LOADING...">
              <></>
            </Card>
          )}
          <Transactions />
        </div>
        <div className="col-span-3 flex h-full flex-col gap-4" ref={parent2}>
          {values ? (
            <>
              <TradeBox />
              {pro && (
                <Card className="w-full">
                  <RebalancingResults />
                </Card>
              )}
              <Positions />
            </>
          ) : (
            <Card className="flex h-full w-full justify-center pt-[15vh]" title="LOADING...">
              <></>
            </Card>
          )}
        </div>
      </div>

      {/* MOBILE */}
      <div className="block w-screen space-y-[1vh] overflow-x-hidden pb-[20vh] md:hidden">
        {values && dates ? (
          <>
            <ChartOptions />
            <ChartsContainer />
          </>
        ) : (
          <Card className="flex h-full w-full justify-center" title="LOADING...">
            <></>
          </Card>
        )}
        {pro && values && <RebalancingResults />}
        <Positions />
        <Transactions />
        <VaultsInfo />

        <Card>
          <CollateralsTable />
        </Card>

        <div className="fixed bottom-0 left-0 z-50 w-screen">
          <p className="w-full bg-carmesi p-6 text-center">
            For a better experience, please use your desktop browser to interact with our platform.
          </p>
          <div className="flex justify-around space-x-1 bg-smoke p-[2vh]">
            {!isConnected && <CustomConnectButton />}
            {isConnected && (
              <>
                <AlternateButton handleClick={() => toggleModal(0)} className="bg-opacity-0">
                  <p className="font-bold">DEPOSIT</p>
                </AlternateButton>
                <AlternateButton handleClick={() => toggleModal(1)} className="bg-opacity-0">
                  <p className="font-bold">CLAIM</p>
                </AlternateButton>
                <AlternateButton handleClick={() => toggleModal(2)} className="bg-opacity-0">
                  <p className="font-bold">WITHDRAW</p>
                </AlternateButton>
                {open && (
                  <Modal onClose={() => toggleModal(0)}>
                    <ActionCard defaultValue={defaultValue} />
                  </Modal>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard

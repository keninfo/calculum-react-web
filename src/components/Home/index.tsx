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
import Transactions from '@/components/Transactions'
import VaultsInfo from '@/components/VaultsInfo'
import { PrimaryButton } from '@/components/common/Buttons'
import Card from '@/components/common/Card'
import CustomConnectButton from '@/components/common/CustomConnectButton'
import Modal from '@/components/common/Modal'
import ContractReads from '@/hooks/useContractReads'

const Home = () => {
  const { InMaintenance } = ContractReads()
  const [open, setOpen] = useState<boolean>(false)
  const [defaultValue, setDefaultValue] = useState<number>(0)
  const { pro } = useContext(ProContext)
  const { dates, values } = useContext(CoinsContext)
  const { isConnected } = useAccount()
  const [parent1] = useAutoAnimate()
  const [parent2] = useAutoAnimate()

  let status = false

  const data = InMaintenance().data as [boolean, number]
  if (data) {
    status = data[0] as boolean
  }

  const toggleModal = (value: number) => {
    setOpen((prevOpen) => !prevOpen)
    setDefaultValue(value)
  }
  return (
    <>
      {/* DESKTOP */}
      <div className={`hidden | md:grid grid-cols-11 ${status ? 'mt-[15.5vh]' : 'mt-[10.5vh]'}`}>
        <div className={`p-[.5vw]  col-span-8 flex flex-col`} ref={parent1}>
          {values && dates ? (
            <ChartsContainer />
          ) : (
            <Card className="w-full h-full flex justify-center pt-[15vh]" title="LOADING...">
              <></>
            </Card>
          )}
          <VaultsInfo />
          <Transactions />
        </div>
        <div className="p-[.5vw] col-span-3 h-full flex flex-col" ref={parent2}>
          {values ? (
            <>
              <ChartOptions />
              <ActionCard />
              <Positions />
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
        {values && dates ? (
          <ChartsContainer />
        ) : (
          <Card className="w-full h-full flex justify-center" title="LOADING...">
            <></>
          </Card>
        )}
        {pro && values && <RebalancingResults />}
        <Card>
          <Transactions />
        </Card>
        <VaultsInfo />
        <Card>
          <CollateralsTable />
        </Card>
        <div className="fixed bottom-0 left-0 w-screen z-50 ">
          <p className="bg-carmesi w-screen h-fit text-center px-[2vw] py-[1vh]">
            This is a BETA version, for a better experience head over to the desktop version
          </p>
          <div className="flex justify-around p-[2vh] bg-smoke space-x-1">
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
      </div>
    </>
  )
}

export default Home

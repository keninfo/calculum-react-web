import React, { useContext, useState } from 'react'

import { useAccount } from 'wagmi'

import ActionCard from '@/components/ActionCard'
import ChartsContainer from '@/components/ChartsContainer/Index'
import CollateralsTable from '@/components/CollateralsTable'
import TradesTable from '@/components/TradesTable'
import VaultsInfo from '@/components/VaultsInfo'
import Card from '@/components/common/Card'
import ContractReads from '@/hooks/useContractReads'

import { CoinsContext, ProContext } from '../AppProviders'
import ChartOptions from '../ChartOptions/Index'
import RebalancingResults from '../RebalancingResults'
import { PrimaryButton } from '../common/Buttons'
import CustomConnectButton from '../common/CustomConnectButton'
import Modal from '../common/Modal'

const Home = () => {
  const { InMaintenance } = ContractReads()
  const [open, setOpen] = useState<boolean>(false)
  const [defaultValue, setDefaultValue] = useState<number>(0)
  const { pro } = useContext(ProContext)
  const { dates, values, coins } = useContext(CoinsContext)
  const { isConnected } = useAccount()

  let status = false

  const data = InMaintenance().data as [boolean, number]
  if (data) {
    status = data[0] as boolean
  }

  const toggleModal = (value: number) => {
    setOpen((prevOpen) => !prevOpen)
    setDefaultValue(value)
  }

  console.log(coins)

  return (
    <>
      {/* DESKTOP */}
      <div className={`hidden | md:grid grid-cols-11 ${status ? 'mt-[13.5vh]' : 'mt-[8.5vh]'}`}>
        <div className={`p-[.5vw]  col-span-8`}>
          {values && dates ? (
            <ChartsContainer prices={values} dates={dates} />
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
          {values ? (
            <>
              <ChartOptions prices={values} />
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
        {values && dates ? (
          <ChartsContainer prices={values} dates={dates} />
        ) : (
          <Card className="w-full h-full flex justify-center" title="LOADING...">
            <></>
          </Card>
        )}
        {pro && values && <RebalancingResults data={values} />}
        <Card>
          <TradesTable />
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

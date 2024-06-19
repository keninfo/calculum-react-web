import React, { useState } from 'react'

import { useAccount } from 'wagmi'

import ConnectButton from '../common/ConnectButton'

const TradesTable = () => {
  const { isConnected } = useAccount()
  const [selected, setSelected] = useState<number>(0)
  return (
    <div className="w-full">
      <div className="flex justify-between items-start | md:pl-[5vh]">
        <h1 className="text-xl text-center font-bold border-b-carmesi border-b-4 pb-1">TRADES</h1>
        <div className="flex justify-between items-center space-x-1">
          <div
            className={`text-center border-2  bg-smoke px-[2vw] py-[1vh] cursor-pointer  hover:scale-105 ${selected == 0 ? 'border-white' : 'border-smoke'}`}
            onClick={() => setSelected(0)}
          >
            <h4>Open</h4>
          </div>
          <div
            className={`text-center border-2  bg-smoke px-[2vw] py-[1vh] cursor-pointer  hover:scale-105 ${selected == 1 ? 'border-white' : 'border-smoke'}`}
            onClick={() => setSelected(1)}
          >
            <h4>Closed</h4>
          </div>
        </div>
      </div>
      {isConnected ? (
        <div className="md:ml-[5vh]">
          <p className="text-center mt-[10vh] text-2xl">
            {selected == 0 && `You currently have no open trades`}
            {selected == 1 && `You currently have no closed trades`}
          </p>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="space-y-4 mt-[2vh] text-center | md:mt-[10vh]">
            <p className="text-2xl text-carmesi my-[4vh] | md:my-0">Connect a wallet to see your trades</p>
            <ConnectButton className="!bg-smoke mx-auto" />
          </div>
        </div>
      )}
    </div>
  )
}

export default TradesTable

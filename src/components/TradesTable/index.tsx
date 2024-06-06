import React, { useState } from 'react'

import { useAccount } from 'wagmi'

import ConnectButton from '../common/ConnectButton'

const TradesTable = () => {
  const { isConnected } = useAccount()
  const [selected, setSelected] = useState<number>(0)
  return (
    <div className="w-full h-max">
      <div className="flex justify-between pl-[5vh] items-start">
        <h1 className="text-2xl text-center ">TRADES</h1>
        <div className="flex justify-between items-center">
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
        <div className="ml-[5vh]">
          <table className="table-fixed mt-[4vh] w-full p-[2vw] mx-auto  bg-darkness">
            <thead className="text-[1.2vw] text-carmesi">
              <tr>
                <th className="text-center pb-[2vh]">ASSET</th>
                <th className="text-center pb-[2vh]">AMOUNT</th>
                <th className="text-center pb-[2vh]">SHARES</th>
                <th className="text-center pb-[2vh]">ACTION</th>
              </tr>
            </thead>
            <tbody className="text-[1vw] pl-[2vw]">
              <tr className="">
                <td className="text-center py-[2vh] bg-smoke">USDC</td>
                <td className="text-center  py-[2vh]  bg-smoke">100</td>
                <td className="text-center  py-[2vh]  bg-smoke">100</td>
                <td className="text-center  py-[2vh] bg-smoke">
                  <button className="bg-carmesi py-[1vh] px-[2vw] text-xs">Withdraw</button>
                </td>
              </tr>
            </tbody>
          </table>
          {/* <p className="text-center mt-[10vh] text-2xl">
            {selected == 0 && `You currently have no open trades`}
            {selected == 1 && `You currently have no closed trades`}
          </p> */}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="space-y-4 mt-[10vh]">
            <p className="text-2xl text-carmesi">Connect a wallet to see your trades</p>
            <ConnectButton className="!bg-smoke mx-auto" />
          </div>
        </div>
      )}
    </div>
  )
}

export default TradesTable

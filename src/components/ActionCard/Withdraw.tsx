import React, { useContext } from 'react'

import { CoinContext } from '@/components/AppProviders'

import ConnectButton from '../common/ConnectButton'

const Withdraw = () => {
  const { coin } = useContext(CoinContext)
  return (
    <div className="text-sm">
      <div className="flex justify-center mt-[2vh] space-x-10">
        <p className="text-carmesi cursor-pointer">WITHDRAW</p>
        <p className="cursor-pointer">REDEEM</p>
      </div>
      <select
        name=""
        id=""
        className="bg-darkness text-white border-2 border-white rounded-lg px-[2vw] py-[1vh] w-full my-[3vh]"
      >
        <option selected>USDC invested into {coin}</option>
      </select>
      <div className="flex justify-between space-x-5">
        <input
          placeholder="0.0"
          className="bg-darkness text-white border-2 border-white rounded-lg px-[2vw] py-[1vh] w-full"
        ></input>
        <button className="bg-carmesi rounded-lg px-[2vw] py-[1vh]">MAX</button>
      </div>
      <div className="p-[1vw] my-[2vh] text-sm">
        <div className="flex justify-between ">
          <h4>Fees</h4>
          <p>0.0</p>
        </div>
        <div className="flex justify-between mt-[1vh] ">
          <h4>Total</h4>
          <p>0.0</p>
        </div>
      </div>
      <div className="flex justify-between items-center px-2">
        <ConnectButton />
      </div>
    </div>
  )
}

export default Withdraw

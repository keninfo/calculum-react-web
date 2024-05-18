import React, { useContext } from 'react'

import { CoinContext } from '@/components/AppProviders'

import ConnectButton from '../common/ConnectButton'

const Deposit = () => {
  const { coin } = useContext(CoinContext)
  return (
    <div>
      <select name="" id="" className="bg-darkness text-white border-2 border-white rounded-lg px-6 py-2 w-full my-6">
        <option selected>Strategy...</option>
      </select>
      <input
        placeholder="0.0"
        className="bg-darkness text-white border-2 border-white rounded-lg p-6 w-full -ml-6 "
      ></input>
      <button className="bg-carmesi rounded-lg px-6 py-2 -ml-28">MAX</button>
      <div className="p-2 my-5 text-lg">
        <div className="flex justify-between ">
          <h4>Total</h4>
          <p>0.0</p>
        </div>
        <div className="flex justify-between mt-2 ">
          <h4>Fees</h4>
          <p>0.0</p>
        </div>
        <div className="flex justify-between mt-6">
          <h4>Available Balance</h4>
          <p>0.0</p>
        </div>
        <div className="flex justify-between mt-2 ">
          <h4>Current Position</h4>
          <p>0.0</p>
        </div>
      </div>
      <div className="flex justify-between items-center px-2">
        Deposit {coin}
        <ConnectButton />
      </div>
    </div>
  )
}

export default Deposit

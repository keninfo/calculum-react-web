'use client'

import React, { useContext } from 'react'

import { ProContext } from '../../AppProviders'

const ToggleSwitch = () => {
  const { pro, setPro } = useContext(ProContext)
  return (
    <div className={`flex justify-center items-center space-x-[10px] font-bold`}>
      <div
        className={`border-2 rounded-md w-10 flex ${pro ? 'justify-end border-carmesi' : 'justify-start'} cursor-pointer transition-all duration-250`}
        onClick={() => setPro(!pro)}
      >
        <div
          className={`h-4 w-5 shadow-xl rounded-sm ${pro ? 'bg-carmesi' : 'bg-white'} transition-all duration-250`}
        ></div>
      </div>
      <p className={`${pro ? 'text-carmesi' : 'text-white opacity-30'}`}>PRO</p>
    </div>
  )
}

export default ToggleSwitch

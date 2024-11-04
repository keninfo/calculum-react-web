'use client'

import React, { useContext } from 'react'

import { ProContext } from '@/contexts/ProContext'

const ToggleSwitch = () => {
  const { pro, setPro } = useContext(ProContext)
  return (
    <div className={`flex items-center justify-center space-x-[10px] font-bold`}>
      <div
        className={`flex w-10 rounded-md border-2 ${pro ? 'justify-end border-carmesi' : 'justify-start'} duration-250 cursor-pointer transition-all`}
        onClick={() => setPro(!pro)}
      >
        <div
          className={`h-4 w-5 rounded-sm shadow-xl ${pro ? 'bg-carmesi' : 'bg-white'} duration-250 transition-all`}
        ></div>
      </div>
      <p className={`${pro ? 'text-carmesi' : 'text-white opacity-30'}`}>PRO</p>
    </div>
  )
}

export default ToggleSwitch

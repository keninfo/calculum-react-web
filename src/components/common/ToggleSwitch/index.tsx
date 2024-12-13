'use client'

import React from 'react'

import { useProStore } from '@/store/useProStore'

/** * Toggle switch component for switching between PRO and CLASSIC states. */
const ToggleSwitch = () => {
  const { pro } = useProStore()

  return (
    <div className={`flex items-center justify-center space-x-[10px] font-bold`}>
      <div
        className={`flex w-6 rounded-md border-2 ${pro ? 'justify-end border-primary' : 'justify-start'} duration-250 cursor-pointer transition-all`}
      >
        <div
          className={`h-3 w-3 rounded-sm shadow-xl ${pro ? 'bg-primary' : 'bg-offWhite'} duration-250 transition-all`}
        ></div>
      </div>
      <p className={`${pro ? 'text-primary' : 'text-offWhite opacity-30'}`}>{pro ? 'PRO' : 'TRY PRO'}</p>
    </div>
  )
}

export default ToggleSwitch

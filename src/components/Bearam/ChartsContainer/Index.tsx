'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import AlphaOne from './Charts/AlphaOne'

interface Props {
  BTCRaw: boolean
  ETHRaw: boolean
  SOLRaw: boolean
}

const Chart = ({ BTCRaw, ETHRaw, SOLRaw }: Props) => {
  return (
    <>
      <div>
        <AlphaOne BTCRaw={BTCRaw} ETHRaw={ETHRaw} SOLRaw={SOLRaw} />
      </div>
    </>
  )
}

export default Chart

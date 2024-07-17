'use client'

import React, { useContext } from 'react'

import { CoinsContext } from '@/components/AppProviders'
import VolScaling from '@/components/ChartsContainer/Charts/VolScaling'

const GraphOne = () => {
  const { dates, values } = useContext(CoinsContext)

  const getCoinArray = () => {
    return values ? values[0] : []
  }

  return (
    <>
      {values && dates && (
        <div className="bg-smoke p-[5vh] rounded-lg ">
          <VolScaling dates={dates} seriesData={getCoinArray()} />
        </div>
      )}
    </>
  )
}

export default GraphOne

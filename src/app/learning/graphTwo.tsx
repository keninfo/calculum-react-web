'use client'

import React, { useContext } from 'react'

import { CoinsContext } from '@/components/AppProviders'
import ActualVol from '@/components/ChartsContainer/Charts/ActualVol'
import ActualVolScaling from '@/components/ChartsContainer/Charts/ActualVolScaling'

const GraphTwo = ({ show = false }: { show?: boolean }) => {
  const { dates, values } = useContext(CoinsContext)

  const getCoinArray = () => {
    return values ? values[0] : []
  }

  return (
    <>
      {values && dates && (
        <div className="bg-smoke p-[5vh] rounded-lg">
          <ActualVol dates={dates} seriesData1={getCoinArray()} seriesData2={getCoinArray()} rawOnly={!show} />
          <div className="my-[6vh] border-b-2"></div>
          <ActualVolScaling dates={dates} seriesData={getCoinArray()} rawOnly={!show} />
        </div>
      )}
    </>
  )
}

export default GraphTwo

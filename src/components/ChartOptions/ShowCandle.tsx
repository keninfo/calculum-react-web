import React, { useContext } from 'react'

import { OptionsContext } from '@/components/AppProviders'

import { PrimaryButton } from '../common/Buttons'

const ShowCandle = () => {
  const { showCandle, setShowCandle } = useContext(OptionsContext)

  return (
    <PrimaryButton
      handleClick={() => setShowCandle(!showCandle)}
      className="!w-fit py-[.5vh] text-xs px-[2vw] rounded-md"
    >
      {showCandle ? 'Hide' : 'Show'}
    </PrimaryButton>
  )
}

export default ShowCandle

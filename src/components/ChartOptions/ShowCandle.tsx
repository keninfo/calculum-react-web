import React, { useContext } from 'react'

import { OptionsContext } from '@/contexts/OptionsContext'

import { PrimaryButton } from '../common/Buttons'

const ShowCandle = () => {
  const { showCandle, setShowCandle } = useContext(OptionsContext)

  return (
    <PrimaryButton
      handleClick={() => setShowCandle(!showCandle)}
      className="!w-fit rounded-md px-[2vw] py-[.5vh] text-xs"
    >
      {showCandle ? 'Hide' : 'Show'}
    </PrimaryButton>
  )
}

export default ShowCandle

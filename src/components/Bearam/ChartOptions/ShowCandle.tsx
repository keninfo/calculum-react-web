import React from 'react'

import { PrimaryButton } from '@/components/common/Buttons'
import { useOptionsStore } from '@/store/useOptionsStore'

const ShowCandle = () => {
  const { showCandle, setShowCandle } = useOptionsStore()

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

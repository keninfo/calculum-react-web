import React from 'react'

import ActionAlert from '@/components/common/ActionAlert'

const Inactive = () => {
  return (
    <>
      <h4 className="mb-[1vh] mt-[4vh] text-xl"> Welcome to Smoothcoin!</h4>
      <ActionAlert
        alert={`Before using this strategy you need to approve it, we recommend using the MAX, but you are welcomed to approve as much or as little as you like !`}
      />
    </>
  )
}

export default Inactive

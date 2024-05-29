import React from 'react'

import ActionAlert from '@/components/common/ActionAlert'

import Approve from '../Approve'

const Inactive = () => {
  return (
    <>
      <h4 className="mt-[4vh] mb-[1vh] text-xl"> Welcome to Bear Protocol!</h4>
      <ActionAlert
        alert={`Before using this strategy you need to approve it, we recommend using the MAX, but you are welcomed to approve as much or as little as you like !`}
      />
      <Approve />
    </>
  )
}

export default Inactive

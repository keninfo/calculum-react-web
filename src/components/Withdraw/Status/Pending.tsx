import React from 'react'

import ActionAlert from '../../common/ActionAlert'
import Completed from './Completed'

const Pending = () => {
  return (
    <>
      <ActionAlert alert="You have a deposit pending, wait at least one epoch for it to be reflected." />
      <Completed />
    </>
  )
}

export default Pending

import React from 'react'

import ActionAlert from '../../common/ActionAlert'

const PendingWithdraw = () => {
  return (
    <ActionAlert alert="Your pending withdraw is being processed, wait at least one epoch for it to be reflected" />
  )
}

export default PendingWithdraw

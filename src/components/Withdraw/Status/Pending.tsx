import React from 'react'

import ActionAlert from '@/components/common/ActionAlert'
import Completed from './Completed'

const Pending = ({ selected }: { selected: number }) => {
  return (
    <>
      <ActionAlert alert="You have a deposit pending, wait at least one epoch for it to be reflected." />
      <Completed selected={selected} />
    </>
  )
}

export default Pending

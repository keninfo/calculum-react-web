import React from 'react'

import ActionAlert from '@/components/common/ActionAlert'

const PendingDeposit = ({ shares }: { shares: string }) => {
  return (
    <>
      <ActionAlert alert="Your smoothcoins are still pending, wait one Epoch to be able to claim them!" />
      <div className="px-[2vw] py-[1vh] text-center">
        <h4>PENDING SMOOTHCOINS</h4>
        <p>{shares}</p>
      </div>
    </>
  )
}

export default PendingDeposit

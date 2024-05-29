import React from 'react'

import ActionAlert from '@/components/common/ActionAlert'

const PendingDeposit = ({ shares }: { shares: string }) => {
  return (
    <>
      <ActionAlert alert="Your shares are still pending, wait one Epoch to be able to claim them!" />
      <div className="text-center border-2 bg-smoke rounded-lg px-[2vw] py-[1vh]  border-white">
        <h4>PENDING SHARES</h4>
        <p>{shares}</p>
      </div>
    </>
  )
}

export default PendingDeposit

import React from 'react'

import ActionAlert from '@/components/common/ActionAlert'

const PendingWithdraw = ({ assets }: { assets: string }) => {
  return (
    <>
      <ActionAlert alert="Your assets are still pending, wait one Epoch to be able to claim them!" />
      <div className="text-center border-2 bg-smoke rounded-lg px-[2vw] py-[1vh]  border-white">
        <h4>PENDING ASSETS</h4>
        <p>{assets}</p>
      </div>
    </>
  )
}

export default PendingWithdraw

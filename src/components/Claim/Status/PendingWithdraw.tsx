import React from 'react'

import ActionAlert from '@/components/common/ActionAlert'

const PendingWithdraw = ({ assets }: { assets: string }) => {
  return (
    <>
      <ActionAlert alert="Your assets are still pending, wait one Epoch to be able to claim them!" />
      <div className="text-center  px-[2vw] py-[1vh]  ">
        <h4>PENDING ASSETS</h4>
        <p>{assets}</p>
      </div>
    </>
  )
}

export default PendingWithdraw

import React from 'react'

import Redeem from '../Redeem'
import WithdrawAsset from '../WithdrawAsset'

const Completed = ({ selected }: { selected: number }) => {
  return (
    <>
      <div className="my-[2vh]">
        {selected == 0 && <WithdrawAsset />}
        {selected == 1 && <Redeem />}
      </div>
    </>
  )
}

export default Completed

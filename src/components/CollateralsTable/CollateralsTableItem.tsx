import React from 'react'

import CryptoIcon from '@/components/common/CryptoIcon'
import { formatBalance } from '@/utils/formatters'

const CollateralsTableItem = (amount: bigint) => {
  return (
    <tr className="cursor-pointer hover:scale-105 text-sm [&>td]:py-[2vh] [&>td]:border-b [&>td]:border-darkness">
      <td className={`flex justify-start items-center mr-[4vw] `}>
        <CryptoIcon coin={'USDC'} className="size-[1.5rem] mr-[.5vw]" /> USDC
      </td>
      <td className="text-right">${formatBalance(amount)}</td>
    </tr>
  )
}

export default CollateralsTableItem

import React from 'react'

import CryptoIcon from '@/components/common/CryptoIcon'
import { formatBalance } from '@/utils/formatters'

const CollateralsTableItem = (amount: bigint) => {
  return (
    <tr className="w-full cursor-pointer text-md hover:scale-105 [&>td]:py-[2vh] [&>td]:border-b [&>td]:border-darkness | md:text-sm ">
      <td className="flex justify-start items-center |  md:mr-[4vw]">
        <CryptoIcon coin={'USDC'} className="size-[2rem] mr-[2vw] | md:mr-[.5vw] md:size-[1.5rem]" /> USDC
      </td>
      <td className="text-right">${formatBalance(amount)}</td>
    </tr>
  )
}

export default CollateralsTableItem

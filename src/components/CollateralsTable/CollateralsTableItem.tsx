import React from 'react'

import CryptoIcon from '@/components/common/CryptoIcon'
import { formatBalance } from '@/utils/formatters'

const CollateralsTableItem = (amount: bigint) => {
  return (
    <tr className="text-md w-full cursor-pointer hover:scale-105 md:text-sm [&>td]:border-b [&>td]:border-darkness [&>td]:py-[2vh]">
      <td className="flex items-center justify-start md:mr-[4vw]">
        <CryptoIcon coin={'USDC'} className="| mr-[2vw] size-[2rem] md:mr-[.5vw] md:size-[1.5rem]" /> USDC
      </td>
      <td className="text-right">${formatBalance(amount)}</td>
    </tr>
  )
}

export default CollateralsTableItem

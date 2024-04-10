import type { Hash } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

import { useWriteContract } from 'wagmi'

import { calculumVaultContract } from '@/contracts/calculumVault'
import { OWNER_PK } from '@/utils/constants'

const useAppDropToWhitelist = () => {
  const { writeContract } = useWriteContract()

  const pk = OWNER_PK as `0x${string}`
  const account = privateKeyToAccount(pk)

  const addDrop = (addressToAddOrDrop: string, statement: boolean) => {
    writeContract({
      account,
      abi: calculumVaultContract.abi,
      address: calculumVaultContract.address as Hash,
      functionName: 'addDropWhitelist',
      args: [addressToAddOrDrop, statement],
    })
  }

  return { addDrop }
}

export default useAppDropToWhitelist

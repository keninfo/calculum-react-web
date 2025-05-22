import { getAddress } from 'viem'
import type { Hash } from 'viem'

import { usePublicClient } from 'wagmi'

import { VELVET_CAPITAL_PORTFOLIO } from '@/shared/constants'

const IMPLEMENTATION_SLOT = '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc'

export const useGetImplementationAddress = async () => {
  const publicClient = usePublicClient({ chainId: 8453 })

  const storage = await publicClient?.getStorageAt({
    address: VELVET_CAPITAL_PORTFOLIO as Hash,
    slot: IMPLEMENTATION_SLOT,
  })

  const implAddress = `0x${storage?.slice(-40)}`
  return getAddress(implAddress)
}

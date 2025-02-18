import { arbitrumSepolia } from '@wagmi/core/chains'

import { createPublicClient, http } from 'viem'

export const publicClient = createPublicClient({
  cacheTime: 10_000,
  batch: {
    multicall: {
      wait: 100,
    },
  },
  chain: arbitrumSepolia,
  transport: http(undefined, {
    retryCount: 5,
    retryDelay: 1000,
  }),
})

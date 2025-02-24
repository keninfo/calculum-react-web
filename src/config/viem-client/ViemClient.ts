import { arbitrumSepolia, base } from '@wagmi/core/chains'

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

export const publicClientBase = createPublicClient({
  cacheTime: 10_000,
  batch: {
    multicall: {
      wait: 100,
    },
  },
  chain: base,
  transport: http(undefined, {
    retryCount: 5,
    retryDelay: 1000,
  }),
})

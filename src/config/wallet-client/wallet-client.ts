import { createWalletClient, custom } from 'viem'

import { arbitrumSepolia } from 'wagmi/chains'

let walletClient: ReturnType<typeof createWalletClient> | undefined

if (typeof window !== 'undefined' && window.ethereum) {
  walletClient = createWalletClient({
    chain: arbitrumSepolia,
    transport: custom(window.ethereum),
  })
}

export { walletClient }

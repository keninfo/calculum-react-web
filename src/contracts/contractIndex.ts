import type { Abi, Hash } from 'viem'

import { contractMomentumBTC } from './momentumBTC'
import { contractSmoothcoinBTC } from './smoothcoinBTC'

export interface contractType {
  isWorking: boolean
  strategy: string
  coin: string
  abi: Abi
  address: Hash
  chainId: string
  chain: string
  symbol: string
  icon: string
  info: string
}

export const contractIndex = [
  {
    isWorking: true,
    strategy: 'Momentum',
    coin: 'BTC',
    abi: contractMomentumBTC.abi,
    address: contractMomentumBTC.address,
    chainId: contractMomentumBTC.chainId,
    chain: 'Arbitrum Sepolia',
    symbol: 'moBTC',
    icon: '/tokens/moBTC.png',
    info: 'Outperform passive HODLing with no leverage, using this 30-year battle-tested TradFi strategy.',
  },
  {
    isWorking: true,
    strategy: 'Smoothcoin',
    coin: 'BTC',
    abi: contractSmoothcoinBTC.abi,
    address: contractSmoothcoinBTC.address,
    chainId: contractSmoothcoinBTC.chainId,
    chain: 'Arbitrum Sepolia',
    symbol: 'scBTC',
    icon: '/tokens/scBTC.png',
    info: 'Live your life without having to constantly check on the market.',
  },
  {
    isWorking: false,
    strategy: 'Momentum',
    coin: 'ETH',
    abi: contractMomentumBTC.abi,
    address: contractMomentumBTC.address,
    chainId: contractMomentumBTC.chainId,
    chain: 'Coming Soon',
    symbol: 'moETH',
    icon: '/tokens/moETH.png',
    info: 'Outperform passive HODLing with no leverage, using this 30-year battle-tested TradFi strategy.',
  },
  {
    isWorking: false,
    strategy: 'Smoothcoin',
    coin: 'ETH',
    abi: contractSmoothcoinBTC.abi,
    address: contractSmoothcoinBTC.address,
    chainId: contractSmoothcoinBTC.chainId,
    chain: 'Coming Soon',
    symbol: 'scETH',
    icon: '/tokens/scETH.png',
    info: 'Live your life without having to constantly check on the market.',
  },
  {
    isWorking: false,
    strategy: 'Momentum',
    coin: 'PEPE',
    abi: contractMomentumBTC.abi,
    address: contractMomentumBTC.address,
    chainId: contractMomentumBTC.chainId,
    chain: 'Coming Soon',
    symbol: 'moPEPE',
    icon: '/tokens/moPEPE.png',
    info: 'Outperform passive HODLing with no leverage, using this 30-year battle-tested TradFi strategy.',
  },
  {
    isWorking: false,
    strategy: 'Momentum',
    coin: 'DOGE',
    abi: contractMomentumBTC.abi,
    address: contractMomentumBTC.address,
    chainId: contractMomentumBTC.chainId,
    chain: 'Coming Soon',
    symbol: 'moDOGE',
    icon: '/tokens/moDOGE.png',
    info: 'Outperform passive HODLing with no leverage, using this 30-year battle-tested TradFi strategy.',
  },

  {
    isWorking: false,
    strategy: 'Smoothcoin',
    coin: 'PEPE',
    abi: contractSmoothcoinBTC.abi,
    address: contractSmoothcoinBTC.address,
    chainId: contractSmoothcoinBTC.chainId,
    chain: 'Coming Soon',
    symbol: 'scPEPE',
    icon: '/tokens/scPEPE.png',
    info: 'Live your life without having to constantly check on the market.',
  },
  {
    isWorking: false,
    strategy: 'Smoothcoin',
    coin: 'DOGE',
    abi: contractSmoothcoinBTC.abi,
    address: contractSmoothcoinBTC.address,
    chainId: contractSmoothcoinBTC.chainId,
    chain: 'Coming Soon',
    symbol: 'scDOGE',
    icon: '/tokens/scDOGE.png',
    info: 'Live your life without having to constantly check on the market.',
  },
]

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
    symbol: 'moBTC',
    icon: 'https://placehold.co/600x600/white/black?text=M',
    info: 'Outperform passive HODLing with a 30-year tested, no leverage TradFi strategy',
  },
  {
    isWorking: true,
    strategy: 'Smoothcoin',
    coin: 'BTC',
    abi: contractSmoothcoinBTC.abi,
    address: contractSmoothcoinBTC.address,
    chainId: contractSmoothcoinBTC.chainId,
    symbol: 'smBTC',
    icon: '/bearLogo.png',
    info: 'Live your life without having to constantly check on the market.',
  },

  {
    isWorking: false,
    strategy: 'Smoothcoin',
    coin: 'ETH',
    abi: contractSmoothcoinBTC.abi,
    address: contractSmoothcoinBTC.address,
    chainId: contractSmoothcoinBTC.chainId,
    symbol: 'smETH',
    icon: '/bearLogo.png',
    info: 'Live your life without having to constantly check on the market.',
  },
  {
    isWorking: false,
    strategy: 'Smoothcoin',
    coin: '1000PEPE',
    abi: contractSmoothcoinBTC.abi,
    address: contractSmoothcoinBTC.address,
    chainId: contractSmoothcoinBTC.chainId,
    symbol: 'smPEPE',
    icon: '/bearLogo.png',
    info: 'Live your life without having to constantly check on the market.',
  },
  {
    isWorking: false,
    strategy: 'Smoothcoin',
    coin: 'DOGE',
    abi: contractSmoothcoinBTC.abi,
    address: contractSmoothcoinBTC.address,
    chainId: contractSmoothcoinBTC.chainId,
    symbol: 'smDOGE',
    icon: '/bearLogo.png',
    info: 'Live your life without having to constantly check on the market.',
  },
  {
    isWorking: false,
    strategy: 'Momentum',
    coin: 'ETH',
    abi: contractMomentumBTC.abi,
    address: contractMomentumBTC.address,
    chainId: contractMomentumBTC.chainId,
    symbol: 'moETH',
    icon: 'https://placehold.co/600x600/white/black?text=M',
    info: 'Outperform passive HODLing with a 30-year tested, no leverage TradFi strategy',
  },
  {
    isWorking: false,
    strategy: 'Momentum',
    coin: '1000PEPE',
    abi: contractMomentumBTC.abi,
    address: contractMomentumBTC.address,
    chainId: contractMomentumBTC.chainId,
    symbol: 'moPEPE',
    icon: 'https://placehold.co/600x600/white/black?text=M',
    info: 'Outperform passive HODLing with a 30-year tested, no leverage TradFi strategy',
  },
  {
    isWorking: false,
    strategy: 'Momentum',
    coin: 'DOGE',
    abi: contractMomentumBTC.abi,
    address: contractMomentumBTC.address,
    chainId: contractMomentumBTC.chainId,
    symbol: 'moDOGE',
    icon: 'https://placehold.co/600x600/white/black?text=M',
    info: 'Outperform passive HODLing with a 30-year tested, no leverage TradFi strategy',
  },
]

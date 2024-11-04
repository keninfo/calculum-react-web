import type { Abi, Address } from 'viem'

import { contractMomentumBTC } from './momentumBTC'
import { contractSmoothcoinBTC } from './smoothcoinBTC'

export interface contractType {
  isWorking: boolean
  strategy: string
  coin: string
  abi: Abi | null
  address: Address | null
  chainId: string | null
  symbol: string
  icon: string
}

export const contractIndex = [
  {
    isWorking: true,
    strategy: 'Smoothcoin',
    coin: 'BTC',
    abi: contractSmoothcoinBTC.abi,
    address: contractSmoothcoinBTC.address,
    chainId: contractSmoothcoinBTC.chainId,
    symbol: 'smBTC',
    icon: '/bearLogo.png',
  },
  {
    isWorking: true,
    strategy: 'Momentum',
    coin: 'BTC',
    abi: contractMomentumBTC.abi,
    address: contractMomentumBTC.address,
    chainId: contractMomentumBTC.chainId,
    symbol: 'moBTC',
    icon: 'https://placehold.co/600x600/gold/black?text=M',
  },
  {
    isWorking: false,
    strategy: 'Smoothcoin',
    coin: 'ETH',
    abi: null,
    address: null,
    chainId: null,
    symbol: 'smETH',
    icon: '/bearLogo.png',
  },
  {
    isWorking: false,
    strategy: 'Smoothcoin',
    coin: 'PEPE',
    abi: null,
    address: null,
    chainId: null,
    symbol: 'smPEPE',
    icon: '/bearLogo.png',
  },
  {
    isWorking: false,
    strategy: 'Momentum',
    coin: 'ETH',
    abi: null,
    address: null,
    chainId: null,
    symbol: 'moETH',
    icon: 'https://placehold.co/600x600/gold/black?text=M',
  },
  {
    isWorking: false,
    strategy: 'Momentum',
    coin: 'PEPE',
    abi: null,
    address: null,
    chainId: null,
    symbol: 'moPEPE',
    icon: 'https://placehold.co/600x600/gold/black?text=M',
  },
]

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
    icon: 'https://placehold.co/600x600/gold/black?text=M',
    info: 'Outperform passive HODLing with a 30-year tested, no leverage TradFi Strategy',
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
    abi: null,
    address: null,
    chainId: '421614',
    symbol: 'smETH',
    icon: '/bearLogo.png',
    info: '',
  },
  {
    isWorking: false,
    strategy: 'Smoothcoin',
    coin: 'PEPE',
    abi: null,
    address: null,
    chainId: '421614',
    symbol: 'smPEPE',
    icon: '/bearLogo.png',
    info: '',
  },
  {
    isWorking: false,
    strategy: 'Momentum',
    coin: 'ETH',
    abi: null,
    address: null,
    chainId: '421614',
    symbol: 'moETH',
    icon: 'https://placehold.co/600x600/gold/black?text=M',
    info: '',
  },
  {
    isWorking: false,
    strategy: 'Momentum',
    coin: 'PEPE',
    abi: null,
    address: null,
    chainId: '421614',
    symbol: 'moPEPE',
    icon: 'https://placehold.co/600x600/gold/black?text=M',
    info: '',
  },
]

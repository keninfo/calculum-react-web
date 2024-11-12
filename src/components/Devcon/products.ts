export interface productType {
  strategy: string
  coin: string
  symbol: string
  icon: string
  path: string
}

export const products = [
  {
    strategy: 'Momentum',
    coin: 'BTC',
    symbol: 'momBTC',
    icon: 'https://placehold.co/600x600/f7931a/white?text=M',
    path: '/momentum/btc.csv',
  },
  {
    strategy: 'Momentum',
    coin: 'ETH',
    symbol: 'momETH',
    icon: 'https://placehold.co/600x600/497493/white?text=M',
    path: '/momentum/eth.csv',
  },
  {
    strategy: 'Momentum',
    coin: 'PEPE',
    symbol: 'momPEPE',
    icon: 'https://placehold.co/600x600/509624/white?text=M',
    path: '/momentum/pepe.csv',
  },
  {
    strategy: 'Momentum',
    coin: 'SOL',
    symbol: 'momSOL',
    icon: 'https://placehold.co/600x600/9945FF/14F195?text=M',
    path: '/momentum/sol.csv',
  },
  {
    strategy: 'Momentum',
    coin: 'DOGE',
    symbol: 'momDOGE',
    icon: 'https://placehold.co/600x600/cb9800/black?text=M',
    path: '/momentum/doge.csv',
  },
  {
    strategy: 'Momentum',
    coin: 'WIF',
    symbol: 'momWIF',
    icon: 'https://placehold.co/600x600/EFBFA8/black?text=M',
    path: '/momentum/wif.csv',
  },
  {
    strategy: 'Momentum',
    coin: 'ARB',
    symbol: 'momARB',
    icon: 'https://placehold.co/600x600/2C374B/24A2EE?text=M',
    path: '/momentum/arb.csv',
  },
]

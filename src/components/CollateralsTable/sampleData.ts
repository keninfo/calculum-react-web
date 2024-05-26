export type coinData = {
  asset: string
  apy: number
  price: number
  market: string
}
export const sampleData: coinData[] = [
  {
    asset: 'BTC',
    apy: +156.71,
    price: 68980.4,
    market: '1,363.62B',
  },
  {
    asset: 'ETH',
    apy: +19.96,
    price: 3747.28,
    market: '450.17B',
  },
  {
    asset: 'BNB',
    apy: +95.34,
    price: 600.83,
    market: '88.67B',
  },
  {
    asset: 'SOL',
    apy: +61.11,
    price: 167.81,
    market: '75.42B',
  },
  {
    asset: 'MATIC',
    apy: -21.29,
    price: 0.724898,
    market: '7.17B',
  },
  {
    asset: 'BCH',
    apy: +95.74,
    price: 517.84,
    market: '10.21B',
  },
  {
    asset: 'ADA',
    apy: -20.98,
    price: 0.459704,
    market: '16.41B',
  },
]

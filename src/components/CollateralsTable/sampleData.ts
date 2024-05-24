export type coinData = {
  asset: string
  apy: number
  composition: number
  value: number
}
export const sampleData: coinData[] = [
  {
    asset: 'BTC',
    apy: -2.05,
    composition: 3.3795,
    value: 1.7885,
  },
  {
    asset: 'ETH',
    apy: 8.87,
    composition: 2.2206,
    value: 5.5808,
  },
  {
    asset: 'BNB',
    apy: 5.16,
    composition: 3.5841,
    value: 5.8348,
  },
  {
    asset: 'SOL',
    apy: -1.17,
    composition: 2.6122,
    value: 7.6025,
  },
  {
    asset: 'MATIC',
    apy: -0.37,
    composition: 5.1197,
    value: 7.1521,
  },
  {
    asset: 'BCH',
    apy: 5.16,
    composition: 3.5841,
    value: 5.8348,
  },
  {
    asset: 'ADA',
    apy: -0.37,
    composition: 5.1197,
    value: 7.1521,
  },
]

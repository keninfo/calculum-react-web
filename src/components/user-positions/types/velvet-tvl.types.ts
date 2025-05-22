export interface VelvetTVLResponse {
  data: VelvetTVLData[]
}

export interface VelvetTVLData {
  portfolio: string
  totalValueLiquidity: string
}

export interface VelvetPortfolioTransactionsResponse {
  data: PortfolioTransactionData[]
}

interface PortfolioTransactionData {
  name: string
  symbol: string
  portfolio: string
  user: string
  burnedAmount?: string
  userBalanceBeforeWithdrawal?: string
  userBalanceAfterWithdrawal?: string
  portfolioTotalSupplyAfterWithdrawal?: string
  usdAmount: string
  portfolioTokens: string[]
  withdrawalAmounts?: string[]
  portfolioTokensPrices: string[]
  kind: string
  chainID: number
  chainName: string
  txnHash: string
  createdAt: string
  mintedAmount?: string
  userBalanceBeforeDeposit?: string
  userBalanceAfterDeposit?: string
  portfolioTotalSupplyAfterDeposit?: string
  depositedAmounts?: string[]
}

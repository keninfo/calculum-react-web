import axios from 'axios'
import type { AxiosResponse } from 'axios'

import type { Hash } from 'viem'

import { VELVET_CAPITAL_PORTFOLIO } from '@/shared/constants'

import type { VelvetPortfolioTransactionsResponse, VelvetTVLResponse } from '../types'

export const getVelvetPortfolioTVLService = async (): Promise<VelvetTVLResponse> => {
  const { data } = await axios.get(
    `https://intents.velvet.capital/api/v1/portfolio/tvl?portfolios=${VELVET_CAPITAL_PORTFOLIO}&chainID=8453`,
  )
  return data
}

export const getVelvetPortfolioTransactions = async (
  portfolioAddress: Hash,
): Promise<AxiosResponse<VelvetPortfolioTransactionsResponse>> => {
  return await axios.get(`https://intents.velvet.capital/api/v1/portfolio/transactions/${portfolioAddress}`)
}

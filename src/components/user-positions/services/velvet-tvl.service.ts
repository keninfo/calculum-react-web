import axios from 'axios'
import type { AxiosResponse } from 'axios'

import type { Hash } from 'viem'

import { VELVET_CAPITAL_PORTFOLIO, VELVET_CAPITAL_INTENTS_BASE_API_URL } from '@/shared/constants'

import type { VelvetPortfolioTransactionsResponse, VelvetTVLResponse } from '../types'


export const getVelvetPortfolioTVLService = async (): Promise<VelvetTVLResponse> => {
  const { data } = await axios.get(
    `${VELVET_CAPITAL_INTENTS_BASE_API_URL}/v1/portfolio/tvl?portfolios=${VELVET_CAPITAL_PORTFOLIO}&chainID=8453`,
  )
  return data
}

export const getVelvetPortfolioTransactions = async (
  portfolioAddress: Hash,
): Promise<AxiosResponse<VelvetPortfolioTransactionsResponse>> => {
  return await axios.get(`${VELVET_CAPITAL_INTENTS_BASE_API_URL}/v1/portfolio/transactions/${portfolioAddress}`)
}

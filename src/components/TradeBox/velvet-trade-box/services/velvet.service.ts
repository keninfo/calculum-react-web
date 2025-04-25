import axios from 'axios'
import type { AxiosResponse } from 'axios'

import type { VelvetDepositRequest, VelvetApiResponse, VelvetWithdrawRequest } from '../types/'

export const prepareDepositTxService = async (
  body: VelvetDepositRequest,
): Promise<AxiosResponse<VelvetApiResponse>> => {
  return await axios.post('https://intents.velvet.capital/api/v1/portfolio/deposit', body)
}

export const prepareWithdrawTxService = async (body: VelvetWithdrawRequest): Promise<AxiosResponse> => {
  return await axios.post('https://intents.velvet.capital/api/v1/portfolio/withdraw', body)
}

import axios from 'axios'
import type { AxiosResponse } from 'axios'

import type { VelvetDepositRequest, VelvetDepositResponse, VelvetWithdrawRequest } from '../types/'

export const prepareDepositTxService = async (
  body: VelvetDepositRequest,
): Promise<AxiosResponse<VelvetDepositResponse>> => {
  return await axios.post('https://eventsapi.velvetdao.xyz/api/v3/portfolio/deposit', body)
}

export const prepareWithdrawTxService = async (body: VelvetWithdrawRequest): Promise<AxiosResponse> => {
  return await axios.post('https://eventsapi.velvetdao.xyz/api/v3/portfolio/withdraw', body)
}

import axios, { AxiosResponse } from 'axios'

import { VelvetDepositRequest, VelvetWithdrawRequest } from '../types'

export const prepareDepositTx = async (params: VelvetDepositRequest): Promise<AxiosResponse> => {
  return await axios.post('https://eventsapi.velvetdao.xyz/api/v3/portfolio/deposit', params)
}

export const prepareWithdrawTx = async (params: VelvetWithdrawRequest): Promise<AxiosResponse> => {
  return await axios.post('https://eventsapi.velvetdao.xyz/api/v3/portfolio/withdraw', params)
}

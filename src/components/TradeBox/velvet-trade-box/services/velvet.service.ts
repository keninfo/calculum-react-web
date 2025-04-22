import axios from 'axios'
import type { AxiosResponse } from 'axios'

import type { VelvetDepositRequest, VelvetWithdrawRequest } from '../types/'

export const prepareDepositTxService = async (body: VelvetDepositRequest): Promise<AxiosResponse> => {
  console.log('Deposit Request Body:', body)
  const response = await axios.post('https://intents.velvet.capital/api/v1/portfolio/deposit', body)
  console.log('Deposit Response:', response)

  return response
}

export const prepareWithdrawTxService = async (body: VelvetWithdrawRequest): Promise<AxiosResponse> => {
  console.log('Withdraw Request Body:', body)
  const response = await axios.post('https://eventsapi.velvetdao.xyz/api/v3/portfolio/withdraw', body)
  console.log('Withdraw Response:', response)

  return response
}

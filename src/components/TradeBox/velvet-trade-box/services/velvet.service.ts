import axios from 'axios'
import type { AxiosResponse } from 'axios'

import { VELVET_CAPITAL_EVENTS_BASE_API_URL, VELVET_CAPITAL_INTENTS_BASE_API_URL } from '@/shared/constants'

import type {
  VelvetDepositRequest_v1,
  VelvetApiResponse_v1,
  VelvetWithdrawRequest_v1,
  VelvetApiResponse_v3,
  VelvetWithdrawRequest_v3,
  VelvetDepositRequest_v3,
} from '../types/'

// V1

export const prepareDepositTxService_v1 = async (
  body: VelvetDepositRequest_v1,
): Promise<AxiosResponse<VelvetApiResponse_v1>> => {
  return await axios.post(`${VELVET_CAPITAL_INTENTS_BASE_API_URL}/v1/portfolio/deposit`, body)
}

export const prepareWithdrawTxService_v1 = async (body: VelvetWithdrawRequest_v1): Promise<AxiosResponse> => {
  return await axios.post(`${VELVET_CAPITAL_INTENTS_BASE_API_URL}/v1/portfolio/withdraw`, body)
}

// V3

export const prepareDepositTxService_v3 = async (
  body: VelvetDepositRequest_v3,
): Promise<AxiosResponse<VelvetApiResponse_v3>> => {
  return await axios.post(`${VELVET_CAPITAL_EVENTS_BASE_API_URL}/v3/portfolio/deposit`, body)
}

export const prepareWithdrawTxService_v3 = async (body: VelvetWithdrawRequest_v3): Promise<AxiosResponse> => {
  return await axios.post(`${VELVET_CAPITAL_EVENTS_BASE_API_URL}/v3/portfolio/withdraw`, body)
}

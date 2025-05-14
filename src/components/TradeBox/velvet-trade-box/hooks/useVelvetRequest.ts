import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'

import type { AxiosResponse, AxiosError } from 'axios'

import {
  prepareDepositTxService_v1,
  prepareDepositTxService_v3,
  prepareWithdrawTxService_v1,
  prepareWithdrawTxService_v3,
} from '../services'
import type {
  VelvetWithdrawRequest_v1,
  VelvetDepositRequest_v1,
  VelvetApiResponse_v1,
  VelvetWithdrawRequest_v3,
  VelvetDepositRequest_v3,
  VelvetApiResponse_v3,
} from '../types'

interface VelvetRequest {
  PrepareDepositTx_v1: (
    onSuccess: (response: AxiosResponse) => void,
    onError: (error: AxiosError) => void,
  ) => UseMutationResult<AxiosResponse, AxiosError, VelvetDepositRequest_v1>
  PrepareWithdrawTx_v1: (
    onSuccess: (response: AxiosResponse) => void,
    onError: (error: AxiosError) => void,
  ) => UseMutationResult<AxiosResponse<VelvetApiResponse_v1>, AxiosError, VelvetWithdrawRequest_v1>

  PrepareDepositTx_v3: (
    onSuccess: (response: AxiosResponse) => void,
    onError: (error: AxiosError) => void,
  ) => UseMutationResult<AxiosResponse, AxiosError, VelvetDepositRequest_v3>
  PrepareWithdrawTx_v3: (
    onSuccess: (response: AxiosResponse) => void,
    onError: (error: AxiosError) => void,
  ) => UseMutationResult<AxiosResponse<VelvetApiResponse_v3>, AxiosError, VelvetWithdrawRequest_v3>
}

const useVelvetRequest = (): VelvetRequest => {
  // V1
  const PrepareDepositTx_v1 = (
    onSuccess: (response: AxiosResponse) => void,
    onError: (error: AxiosError) => void,
  ): UseMutationResult<AxiosResponse, AxiosError, VelvetDepositRequest_v1> =>
    useMutation<AxiosResponse<VelvetApiResponse_v1>, AxiosError, VelvetDepositRequest_v1>({
      mutationFn: prepareDepositTxService_v1,
      onSuccess,
      onError,
    })

  const PrepareWithdrawTx_v1 = (
    onSuccess: (response: AxiosResponse) => void,
    onError: (error: AxiosError) => void,
  ): UseMutationResult<AxiosResponse, AxiosError, VelvetWithdrawRequest_v1> =>
    useMutation<AxiosResponse, AxiosError, VelvetWithdrawRequest_v1>({
      mutationFn: prepareWithdrawTxService_v1,
      onSuccess,
      onError,
    })

  // V3

  const PrepareDepositTx_v3 = (
    onSuccess: (response: AxiosResponse) => void,
    onError: (error: AxiosError) => void,
  ): UseMutationResult<AxiosResponse, AxiosError, VelvetDepositRequest_v3> =>
    useMutation<AxiosResponse<VelvetApiResponse_v3>, AxiosError, VelvetDepositRequest_v3>({
      mutationFn: prepareDepositTxService_v3,
      onSuccess,
      onError,
    })

  const PrepareWithdrawTx_v3 = (
    onSuccess: (response: AxiosResponse) => void,
    onError: (error: AxiosError) => void,
  ): UseMutationResult<AxiosResponse, AxiosError, VelvetWithdrawRequest_v3> =>
    useMutation<AxiosResponse, AxiosError, VelvetWithdrawRequest_v3>({
      mutationFn: prepareWithdrawTxService_v3,
      onSuccess,
      onError,
    })

  return {
    PrepareDepositTx_v1,
    PrepareWithdrawTx_v1,
    PrepareDepositTx_v3,
    PrepareWithdrawTx_v3,
  }
}

export default useVelvetRequest

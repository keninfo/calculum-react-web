import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'

import type { AxiosResponse, AxiosError } from 'axios'

import { prepareDepositTxService, prepareWithdrawTxService } from '../services'
import type { VelvetWithdrawRequest, VelvetDepositRequest, VelvetApiResponse } from '../types'

interface VelvetRequest {
  PrepareDepositTx: (
    onSuccess: (response: AxiosResponse) => void,
    onError: (error: AxiosError) => void,
  ) => UseMutationResult<AxiosResponse, AxiosError, VelvetDepositRequest>
  PrepareWithdrawTx: (
    onSuccess: (response: AxiosResponse) => void,
    onError: (error: AxiosError) => void,
  ) => UseMutationResult<AxiosResponse<VelvetApiResponse>, AxiosError, VelvetWithdrawRequest>
}

const useVelvetRequest = (): VelvetRequest => {
  const PrepareDepositTx = (
    onSuccess: (response: AxiosResponse) => void,
    onError: (error: AxiosError) => void,
  ): UseMutationResult<AxiosResponse, AxiosError, VelvetDepositRequest> =>
    useMutation<AxiosResponse<VelvetApiResponse>, AxiosError, VelvetDepositRequest>({
      mutationFn: prepareDepositTxService,
      onSuccess,
      onError,
    })

  const PrepareWithdrawTx = (
    onSuccess: (response: AxiosResponse) => void,
    onError: (error: AxiosError) => void,
  ): UseMutationResult<AxiosResponse, AxiosError, VelvetWithdrawRequest> =>
    useMutation<AxiosResponse, AxiosError, VelvetWithdrawRequest>({
      mutationFn: prepareWithdrawTxService,
      onSuccess,
      onError,
    })

  return {
    PrepareDepositTx,
    PrepareWithdrawTx,
  }
}

export default useVelvetRequest

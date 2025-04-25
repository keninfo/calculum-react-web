'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import { useEffect, useState, type FC } from 'react'

import { useForm } from 'react-hook-form'

import type { AxiosError, AxiosResponse } from 'axios'

import { parseUnits } from 'viem'
import type { Hash } from 'viem'
import { base } from 'viem/chains'

import { useAccount, useSendTransaction } from 'wagmi'

import useContract from '@/hooks/useContract'
import useContractReads from '@/hooks/useContractReads'
import { VELVET_CAPITAL_PORTFOLIO, VELVET_CAPITAL_BASE_DEPOSIT_MANAGER } from '@/shared/constants'
import createTransactionAlert from '@/utils/createTransactionAlert'

import { useApproveToken, useVelvetRequest } from '../hooks'
import type { VelvetTxType } from '../schema/velvet.schema'
import { velvetTxSchema } from '../schema/velvet.schema'
import type { VelvetApiResponse, VelvetStatus } from '../types'
import { VelvetTokenType, VelvetTransactionType } from '../types'

const VelvetWithdraw: FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: '',
    },
    mode: 'onChange',
    resolver: zodResolver(velvetTxSchema),
  })

  const [status, setStatus] = useState<VelvetStatus>('idle')
  const [withdrawPayload, setWithdrawPayload] = useState<VelvetApiResponse | null>(null)

  const { address: userAddress } = useAccount()
  const { contractAddress, decimals, contractAbi } = useContract()
  const { sendTransaction } = useSendTransaction()

  const { AllowanceBase } = useContractReads(contractAddress as Hash, contractAbi)
  const { PrepareWithdrawTx } = useVelvetRequest()
  const { approve, isApproved } = useApproveToken()

  const { isSuccess: isAllowanceSuccess } = AllowanceBase(
    userAddress,
    VELVET_CAPITAL_BASE_DEPOSIT_MANAGER ?? '',
    isApproved,
  )

  const { mutate: prepareWithdrawMutation } = PrepareWithdrawTx(
    (response: AxiosResponse) => {
      console.log('success response =>> ', response)
      setWithdrawPayload(response.data)
    },
    (error: AxiosError) => {
      console.log('error response =>> ', error)
      setWithdrawPayload(null)
    },
  )

  const onSubmit = async (data: VelvetTxType) => {
    approve(data.amount)
  }

  // useEffect(() => {
  //   if (isApproving) {
  //     setStatus('Approving... ')
  //   } else setStatus('idle')
  // }, [isApproving])

  useEffect(() => {
    if (isApproved && isAllowanceSuccess && decimals) {
      const depositAmount = getValues('amount')
      const parsedDepositAmount = parseUnits(depositAmount, decimals).toString()

      setStatus('Depositing ...')

      prepareWithdrawMutation({
        portfolio: VELVET_CAPITAL_PORTFOLIO as Hash,
        withdrawToken: contractAddress as Hash,
        withdrawAmount: parsedDepositAmount,
        user: userAddress as Hash,
        withdrawType: VelvetTransactionType.BATCH,
        tokenType: VelvetTokenType.ERC20,
        skipApprovalCheck: true,
        chainID: base.id,
      })
    }
  }, [isApproved, isAllowanceSuccess, decimals, getValues, prepareWithdrawMutation, userAddress, contractAddress])

  useEffect(() => {
    if (withdrawPayload) {
      setStatus('Sending ...')
      sendTransaction(
        {
          gas: BigInt(withdrawPayload.gasLimit),
          gasPrice: BigInt(withdrawPayload.gasPrice),
          to: withdrawPayload.to,
          data: withdrawPayload.data,
          chainId: base.id,
        },
        {
          onSuccess: (response) => {
            console.log('Transaction sent successfully', response)
          },
          onError: (error) => {
            console.log('Error sending transaction', error)
            createTransactionAlert('Error sending deposit transaction', false)
          },
        },
      )
    }
  }, [withdrawPayload, sendTransaction])

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        {...register('amount')}
        className="border-b border-primary bg-transparent"
        disabled={status !== 'idle'}
      />
      {errors.amount && <p className="text-sm text-red-600">{errors.amount.message}</p>}
      <button
        className="bg-primary capitalize text-black"
        onClick={handleSubmit(onSubmit)}
        disabled={status !== 'idle'}
      >
        {status === 'idle' ? 'Deposit' : status}
      </button>
    </div>
  )
}

export default VelvetWithdraw

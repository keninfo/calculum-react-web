'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import { useEffect, useState, type FC } from 'react'

import { useForm } from 'react-hook-form'

import type { AxiosResponse } from 'axios'

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

const VelvetDeposit: FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: '',
    },
    mode: 'onChange',
    resolver: zodResolver(velvetTxSchema),
  })

  const [status, setStatus] = useState<VelvetStatus>('idle')
  const [depositPayload, setDepositPayload] = useState<VelvetApiResponse | null>(null)

  const { address: userAddress } = useAccount()
  const { contractAddress, decimals, contractAbi } = useContract()
  const { sendTransaction } = useSendTransaction()

  const { AllowanceBase } = useContractReads(contractAddress as Hash, contractAbi)
  const { PrepareDepositTx } = useVelvetRequest()
  const { approve, isApproving, isApproved } = useApproveToken()

  const { isSuccess: isAllowanceSuccess } = AllowanceBase(
    userAddress,
    VELVET_CAPITAL_BASE_DEPOSIT_MANAGER ?? '',
    isApproved,
  )

  // const { data: balanceAssetsBaseData } = BalanceAssetsBase(userAddress as Hash)

  const { mutate: prepareDepositMutation } = PrepareDepositTx(
    (response: AxiosResponse) => {
      setStatus('Sending ...')
      setDepositPayload(response.data)
    },
    () => {
      setStatus('idle')
      createTransactionAlert('Error preparing deposit transaction', false)
      setDepositPayload(null)
    },
  )

  const onSubmit = async (data: VelvetTxType) => {
    approve(data.amount)
  }

  useEffect(() => {
    if (isApproving) {
      setStatus('Approving... ')
    } else setStatus('idle')
  }, [isApproving])

  useEffect(() => {
    if (isApproved && isAllowanceSuccess && decimals) {
      const depositAmount = getValues('amount')
      const parsedDepositAmount = parseUnits(depositAmount, decimals).toString()

      setStatus('Depositing ...')

      prepareDepositMutation({
        portfolio: VELVET_CAPITAL_PORTFOLIO as Hash,
        depositToken: contractAddress as Hash,
        depositAmount: parsedDepositAmount,
        user: userAddress as Hash,
        depositType: VelvetTransactionType.BATCH,
        tokenType: VelvetTokenType.ERC20,
        skipApprovalCheck: true,
        chainID: base.id,
      })
    }
  }, [isApproved, isAllowanceSuccess, decimals, getValues, prepareDepositMutation, userAddress, contractAddress])

  useEffect(() => {
    if (depositPayload) {
      sendTransaction(
        {
          gas: BigInt(depositPayload.gasLimit),
          gasPrice: BigInt(depositPayload.gasPrice),
          to: depositPayload.to,
          data: depositPayload.data,
          chainId: base.id,
        },
        {
          onSuccess: () => {
            setStatus('idle')
            reset()
            setDepositPayload(null)
            createTransactionAlert('Transaction sent successfully', false)
          },
          onError: () => {
            setStatus('idle')
            setDepositPayload(null)
            createTransactionAlert('Error sending deposit transaction', false)
          },
        },
      )
    }
  }, [depositPayload, sendTransaction, reset])

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        {...register('amount')}
        className="border-b border-primary bg-transparent"
        disabled={status !== 'idle'}
      />
      {errors.amount && <p className="text-sm text-red-400">{errors.amount.message}</p>}
      <button
        className="rounded-md bg-primary px-4 py-2 capitalize text-black"
        onClick={handleSubmit(onSubmit)}
        disabled={status !== 'idle'}
      >
        {status === 'idle' ? 'Deposit' : status}
      </button>
    </div>
  )
}

export default VelvetDeposit

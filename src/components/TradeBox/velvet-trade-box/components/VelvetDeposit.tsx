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
import { getEip1559Fees } from '@/utils/getEip1559Fees'

import { useApproveToken, useVelvetRequest } from '../hooks'
import type { VelvetTxType } from '../schema/velvet.schema'
import { velvetTxSchema } from '../schema/velvet.schema'
import type { VelvetApiResponse_v1, VelvetStatus } from '../types'
import { VelvetTokenType, VelvetTransactionType } from '../types'

const VelvetDeposit: FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: '',
    },
    mode: 'onChange',
    resolver: zodResolver(velvetTxSchema),
  })

  const [status, setStatus] = useState<VelvetStatus>('idle')
  const [depositPayload, setDepositPayload] = useState<VelvetApiResponse_v1 | null>(null)

  const { address: userAddress } = useAccount()
  const { contractAddress, decimals, contractAbi } = useContract()
  const { sendTransaction } = useSendTransaction()

  const { AllowanceBase, BalanceAssetsBase } = useContractReads(contractAddress as Hash, contractAbi)
  const { PrepareDepositTx_v1 } = useVelvetRequest()
  const { approve, isApproving, isApproved } = useApproveToken()

  const { isSuccess: isAllowanceSuccess } = AllowanceBase(
    userAddress,
    VELVET_CAPITAL_BASE_DEPOSIT_MANAGER ?? '',
    isApproved,
  )

  const { data: balanceAssetsBaseData } = BalanceAssetsBase(userAddress as Hash)

  const { mutate: prepareDepositMutation } = PrepareDepositTx_v1(
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
    const required = parseUnits(data.amount, decimals!) // FIX: fix non nulling assertion

    if (balanceAssetsBaseData && (balanceAssetsBaseData as bigint) < required) {
      setError('amount', {
        type: 'manual',
        message: 'Insufficient balance',
      })
      return
    }
    approve(data.amount)
  }

  useEffect(() => {
    if (isApproving) {
      setStatus('Approving... ')
    } else setStatus('idle')
  }, [isApproving])

  useEffect(() => {
    if (isApproved && isAllowanceSuccess && decimals) {
      setStatus('Depositing ...')

      const depositAmount = getValues('amount')
      const parsedDepositAmount = parseUnits(depositAmount, decimals).toString()

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
      const sendTx = async () => {
        const { maxFeePerGas, maxPriorityFeePerGas } = await getEip1559Fees()
        sendTransaction(
          {
            gas: BigInt(depositPayload.gasLimit),
            to: depositPayload.to,
            data: depositPayload.data,
            chainId: base.id,
            maxFeePerGas,
            maxPriorityFeePerGas,
          },
          {
            onSuccess: () => {
              setStatus('idle')
              reset()
              setDepositPayload(null)
              createTransactionAlert('Transaction sent successfully', true)
            },
            onError: () => {
              setStatus('idle')
              setDepositPayload(null)
              createTransactionAlert('Error sending deposit transaction', false)
            },
          },
        )
      }

      sendTx().catch((error) => {
        console.error('Transaction error:', error)
      })
    }
  }, [depositPayload, sendTransaction, reset])

  return (
    <div className="flex flex-col gap-4">
      <input
        type="number"
        {...register('amount')}
        className="border-b border-primary bg-transparent"
        disabled={status !== 'idle'}
      />
      {errors.amount && <p className="text-sm text-red-400">{errors.amount.message}</p>}
      <button
        className="rounded-md bg-primary px-4 py-2 capitalize text-black transition-all duration-300 ease-in-out hover:scale-[1.01] hover:bg-[#a4c751] disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handleSubmit(onSubmit)}
        disabled={status !== 'idle'}
      >
        {status === 'idle' ? 'Deposit' : status}
      </button>
    </div>
  )
}

export default VelvetDeposit

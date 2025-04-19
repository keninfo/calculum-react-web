'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import { useEffect, useState, type FC } from 'react'

import { useForm } from 'react-hook-form'

import type { AxiosResponse } from 'axios'

import { parseUnits } from 'viem'
import type { Hash } from 'viem'

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useSendTransaction } from 'wagmi'

import useContract from '@/hooks/useContract'
import useContractReads from '@/hooks/useContractReads'
import { VELVET_CAPITAL_PORTFOLIO, VELVET_CAPITAL_BASE_DEPOSIT_MANAGER } from '@/shared/constants'
import createTransactionAlert from '@/utils/createTransactionAlert'

import { useVelvetRequest } from '../hooks'
import { VelvetTxType, velvetTxSchema } from '../schema/velvet.schema'
import { VelvetStatus, VelvetTokenType, VelvetTransactionType } from '../types'

const VelvetDeposit: FC = () => {
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
  const [transactionHash, setTransactionHash] = useState<Hash | undefined>()

  const { address, isDisconnected } = useAccount()
  const { contractAddress, decimals, contractAbi } = useContract()
  const { writeContract } = useWriteContract()
  const { sendTransaction } = useSendTransaction()

  const { AllowanceBase } = useContractReads(contractAddress as Hash, contractAbi)

  const {
    isFetching: isTransactionReceiptFetching,
    isError: isTransactionReceiptError,
    isSuccess: isTransactionReceiptSuccess,
  } = useWaitForTransactionReceipt({
    hash: transactionHash,
  })

  const { PrepareDepositTx } = useVelvetRequest()

  const onSuccessPrepare = (response: AxiosResponse): void => {
    setStatus('Sending ...')
    sendTransaction(response.data, {
      onSuccess: (response) => {
        console.log('Transaction sent successfully', response)
        setTransactionHash(response)
        setStatus('Processing ...')
      },
      onError: (error) => {
        console.log('Error sending transaction', error)
        setStatus('idle')
        createTransactionAlert('Error sending deposit transaction', false)
      },
    })
  }

  const onErrorPrepare = (): void => {
    createTransactionAlert('Error preparing deposit transaction', false)
    setStatus('idle')
  }

  const { mutate: prepareDepositTxMutate, isPending: isPrepareDepositTxPending } = PrepareDepositTx(
    onSuccessPrepare,
    onErrorPrepare,
  )

  const allowance = AllowanceBase(VELVET_CAPITAL_BASE_DEPOSIT_MANAGER).data as bigint

  const handlePrepareDepositTx = async () => {
    if (!address || isDisconnected) {
      createTransactionAlert('User address is not available', false)
      return
    }
    if (!contractAddress) {
      createTransactionAlert('Contract address is not available', false)
      return
    }
    if (!decimals) {
      createTransactionAlert('Error on contract decimals', false)
      return
    }

    const depositAmount = getValues('amount')

    setStatus('Depositing ...')

    prepareDepositTxMutate({
      portfolio: VELVET_CAPITAL_PORTFOLIO as Hash,
      depositToken: contractAddress,
      depositAmount: parseUnits(depositAmount, decimals).toString(),
      user: address,
      depositType: VelvetTransactionType.BATCH,
      tokenType: VelvetTokenType.ERC20,
    })
  }

  const onWriteSuccess = async (response: any) => {
    setStatus('Processing ...')
    setTransactionHash(response)
  }

  const onWriteError = (error: any) => {
    setStatus('idle')
    createTransactionAlert('Error writing contract', false)
  }

  const onSubmit = async (data: VelvetTxType) => {
    if (!address || isDisconnected) {
      console.error('User address is not available')
      return
    }

    if (!contractAddress) {
      console.error('Contract address is not available')
      return
    }

    if (!decimals) {
      console.log('error on contract decimals')
      return
    }

    writeContract(
      {
        account: address,
        address: contractAddress as Hash,
        abi: contractAbi,
        functionName: 'approve',
        args: [VELVET_CAPITAL_BASE_DEPOSIT_MANAGER, parseUnits(data.amount, decimals)],
      },
      {
        onSuccess: onWriteSuccess,
        onError: onWriteError,
      },
    )
  }

  useEffect(() => {
    if (isTransactionReceiptError) {
      setStatus('idle')
    }
  }, [isTransactionReceiptError])

  useEffect(() => {
    if (isTransactionReceiptFetching) {
      setStatus('Processing ...')
    }
  }, [isTransactionReceiptFetching])

  useEffect(() => {
    if (isTransactionReceiptSuccess) {
      handlePrepareDepositTx()
    }
  }, [isTransactionReceiptSuccess])

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

export default VelvetDeposit

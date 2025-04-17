'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import { useEffect, useState, type FC } from 'react'

import { useForm } from 'react-hook-form'

import { Hash, parseUnits } from 'viem'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

import { prepareDepositTx } from '@/components/Home/services'
import { VelvetTokenType, VelvetTransactionType } from '@/components/Home/types'
import useContract from '@/hooks/useContract'
import useContractReads from '@/hooks/useContractReads'
import { VELVET_CAPITAL_PORTFOLIO, VELVET_CAPITAL_VAULT } from '@/shared/constants'

import { DepositFormData, depositSchema } from '../schema/velvet.schema'

const VelvetInput: FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      depositAmount: '',
    },
    mode: 'onChange',
    resolver: zodResolver(depositSchema),
  })

  const [transactionHash, setTransactionHash] = useState<Hash | undefined>()

  const { address, isDisconnected } = useAccount()
  const { contractAddress, decimals, contractAbi } = useContract()
  const { writeContract, isPending: isWritePending } = useWriteContract()

  const { AllowanceBase } = useContractReads(contractAddress as Hash, contractAbi)

  const {
    data: transactionReceiptData,
    isFetching: isTransactionReceiptFetching,
    isError: isTransactionReceiptError,
    isSuccess: isTransactionReceiptSuccess,
    error: transactionReceiptError,
  } = useWaitForTransactionReceipt({
    hash: transactionHash,
  })

  console.log('transactionReceiptData =>> ', transactionReceiptData)

  const depositAmount = getValues('depositAmount')

  const allowance = AllowanceBase(VELVET_CAPITAL_VAULT).data as bigint
  console.log('allowance =>> ', allowance)

  const handlePrepareDepositTx = async () => {
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

    try {
      const txPayload = await prepareDepositTx({
        portfolio: VELVET_CAPITAL_PORTFOLIO as Hash,
        depositToken: contractAddress,
        depositAmount: parseUnits(depositAmount, decimals).toString(),
        user: address,
        depositType: VelvetTransactionType.BATCH,
        tokenType: VelvetTokenType.ERC20,
      })

      console.log('txPayload =>> ', txPayload)
    } catch (error) {
      console.error('Error preparing deposit transaction:', error)
    }
  }

  const onWriteSuccess = async (response: any) => {
    console.log('Write contract successful:', response)
    setTransactionHash(response)
  }

  const onWriteError = (error: any) => {
    console.log('Write contract error:', error)
  }

  const onSubmit = async (data: DepositFormData) => {
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
        args: [VELVET_CAPITAL_VAULT as Hash, parseUnits(data.depositAmount, decimals)],
      },
      {
        onSuccess: onWriteSuccess,
        onError: onWriteError,
      },
    )
  }

  useEffect(() => {
    if (isTransactionReceiptSuccess) {
      handlePrepareDepositTx()
    }
  }, [isTransactionReceiptSuccess])

  return (
    <div className="flex flex-col gap-4">
      <input type="text" {...register('depositAmount')} className="border-b border-primary bg-transparent" />
      {errors.depositAmount && <p className="text-sm text-red-600">{errors.depositAmount.message}</p>}
      <button className="bg-primary capitalize text-black" onClick={handleSubmit(onSubmit)}>
        {/* {isWritePending ? 'Processing...' : 'Deposit'} */}
        deposit
      </button>
    </div>
  )
}

export default VelvetInput

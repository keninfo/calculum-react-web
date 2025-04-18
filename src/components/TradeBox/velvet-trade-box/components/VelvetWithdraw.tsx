import { zodResolver } from '@hookform/resolvers/zod'

import { FC, useState } from 'react'

import { useForm } from 'react-hook-form'

import { Hash, parseUnits } from 'viem'

import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'

import useContract from '@/hooks/useContract'
// import useContractReads from '@/hooks/useContractReads'
import { VELVET_CAPITAL_BASE_DEPOSIT_MANAGER, VELVET_CAPITAL_PORTFOLIO } from '@/shared/constants'
import createTransactionAlert from '@/utils/createTransactionAlert'

import { velvetTxSchema, VelvetTxType } from '../schema'
import { prepareWithdrawTxService } from '../services'
import { VelvetTransactionType, VelvetTokenType } from '../types'

const VelvetWithdraw: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: '',
    },
    mode: 'onChange',
    resolver: zodResolver(velvetTxSchema),
  })

  const [transactionHash, setTransactionHash] = useState<Hash | undefined>()

  const { address, isDisconnected } = useAccount()
  const { contractAddress, decimals, contractAbi } = useContract()

  const { sendTransaction, data: sendTransactionData, isPending: isSendPending } = useSendTransaction()

  // const { AllowanceBase } = useContractReads(contractAddress as Hash, contractAbi)

  const {
    data: transactionReceiptData,
    isFetching: isTransactionReceiptFetching,
    isError: isTransactionReceiptError,
    isSuccess: isTransactionReceiptSuccess,
    error: transactionReceiptError,
  } = useWaitForTransactionReceipt({
    hash: transactionHash,
  })

  // const allowance = AllowanceBase(VELVET_CAPITAL_BASE_DEPOSIT_MANAGER).data as bigint

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

    try {
      const txPayload = await prepareWithdrawTxService({
        portfolio: VELVET_CAPITAL_PORTFOLIO as Hash,
        withdrawToken: contractAddress,
        withdrawAmount: parseUnits(data.amount, decimals).toString(),
        user: address,
        withdrawType: VelvetTransactionType.BATCH,
        tokenType: VelvetTokenType.ERC20,
      })

      sendTransaction(txPayload.data)
    } catch (error) {
      createTransactionAlert('Error preparing deposit transaction', false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <input type="text" {...register('amount')} className="border-b border-primary bg-transparent" />
      {errors.amount && <p className="text-sm text-red-600">{errors.amount.message}</p>}
      <button className="bg-primary capitalize text-black" onClick={handleSubmit(onSubmit)}>
        {/* {isWritePending ? 'Processing...' : 'Deposit'} */}
        withdraw
      </button>
    </div>
  )
}

export default VelvetWithdraw

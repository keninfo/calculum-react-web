import { zodResolver } from '@hookform/resolvers/zod'

import { useState } from 'react'
import { type FC } from 'react'

import { useForm } from 'react-hook-form'

import { parseUnits } from 'viem'
import type { Hash } from 'viem'

import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'

import useContract from '@/hooks/useContract'
// import useContractReads from '@/hooks/useContractReads'
import { VELVET_CAPITAL_PORTFOLIO } from '@/shared/constants'
import createTransactionAlert from '@/utils/createTransactionAlert'

import { velvetTxSchema } from '../schema'
import type { VelvetTxType } from '../schema'
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

  const [transactionHash /*, setTransactionHash */] = useState<Hash | undefined>()

  const { address, isDisconnected } = useAccount()
  const { contractAddress, decimals } = useContract()

  const { sendTransaction } = useSendTransaction()

  const {
    data: transactionReceiptData,
    // isFetching: isTransactionReceiptFetching,
    // isError: isTransactionReceiptError,
    // isSuccess: isTransactionReceiptSuccess,
    // error: transactionReceiptError,
  } = useWaitForTransactionReceipt({
    hash: transactionHash,
  })

  console.log('transactionReceiptData =>> ', transactionReceiptData)

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
      createTransactionAlert('Error preparing withdraw transaction', false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <input type="text" {...register('amount')} className="border-b border-primary bg-transparent" />
      {errors.amount && <p className="text-sm text-red-600">{errors.amount.message}</p>}
      <button className="bg-primary capitalize text-black" onClick={handleSubmit(onSubmit)}>
        {/* {isWritePending ? 'Processing...' : ''} */}
        withdraw
      </button>
    </div>
  )
}

export default VelvetWithdraw

'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import { useEffect, useState, type FC } from 'react'

import { useForm } from 'react-hook-form'

import { parseUnits } from 'viem'
import type { Hash } from 'viem'
import { base } from 'viem/chains'

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

import { VELVET_CAPITAL_PORTFOLIO } from '@/shared/constants'
import createTransactionAlert from '@/utils/createTransactionAlert'
import { getEip1559Fees } from '@/utils/getEip1559Fees'

import { velvetPortfolioAbi } from '../abi/velvetPortfolioAbi'
import type { VelvetTxType } from '../schema/velvet.schema'
import { velvetTxSchema } from '../schema/velvet.schema'
import type { VelvetStatus } from '../types'

const VelvetWithdraw: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    defaultValues: {
      amount: '',
    },
    mode: 'onChange',
    resolver: zodResolver(velvetTxSchema),
  })

  const [status, setStatus] = useState<VelvetStatus>('idle')

  const { address: userAddress } = useAccount()

  const { data: userShares, refetch } = useReadContract({
    address: VELVET_CAPITAL_PORTFOLIO as Hash,
    abi: velvetPortfolioAbi,
    functionName: 'balanceOf',
    args: [userAddress as Hash],
    chainId: base.id,
    query: { enabled: Boolean(userAddress) },
  })

  const { data: txHash, writeContract, isPending } = useWriteContract()

  const { isSuccess, isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash: txHash,
    chainId: base.id,
  })

  const onSubmit = async (data: VelvetTxType) => {
    if (!userShares) return

    try {
      const parsedAmount = parseUnits(data.amount, 18)
      if (parsedAmount > userShares) {
        setError('amount', {
          type: 'manual',
          message: "You can't withdraw more than your available balance.",
        })
        return
      }

      setStatus('Withdrawing ...')

      const { maxFeePerGas, maxPriorityFeePerGas } = await getEip1559Fees()

      writeContract({
        address: VELVET_CAPITAL_PORTFOLIO as Hash,
        abi: velvetPortfolioAbi,
        functionName: 'multiTokenWithdrawal',
        args: [parsedAmount],
        chainId: base.id,
        maxFeePerGas,
        maxPriorityFeePerGas,
      })
    } catch (err) {
      console.error('❌ Error on withdraw:', err)
      createTransactionAlert('Error preparing withdraw.', false)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      reset()
      refetch()
      createTransactionAlert('Withdraw transaction sent', true)
      setStatus('idle')
    } else if (isPending || isConfirming) {
      setStatus('Processing ...')
    } else {
      setStatus('idle')
    }
  }, [isSuccess, isPending, isConfirming, reset, refetch])

  return (
    <div className="flex flex-col gap-4">
      <p>{Number(userShares)}</p>
      <input
        type="text"
        {...register('amount')}
        className="border-b border-primary bg-transparent"
        disabled={status !== 'idle'}
      />
      {errors.amount && <p className="text-sm text-red-600">{errors.amount.message}</p>}
      <button
        className="rounded-md bg-primary px-4 py-2 capitalize text-black transition-all duration-300 ease-in-out hover:scale-[1.01] hover:bg-[#a4c751] disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handleSubmit(onSubmit)}
        disabled={status !== 'idle'}
      >
        {status === 'idle' ? 'Withdraw' : status}
      </button>
    </div>
  )
}

export default VelvetWithdraw

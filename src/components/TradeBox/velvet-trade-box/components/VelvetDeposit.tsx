'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import { useEffect, useState, type FC } from 'react'

import { useForm } from 'react-hook-form'

import type { AxiosError, AxiosResponse } from 'axios'

import { Interface } from 'ethers'

import { decodeErrorResult, parseEther, parseUnits } from 'viem'
import type { Hash } from 'viem'
import { base } from 'viem/chains'

import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSendTransaction,
  useTransactionCount,
  useEstimateGas,
  useSimulateContract,
  useReadContract,
} from 'wagmi'

import useContract from '@/hooks/useContract'
import useContractReads from '@/hooks/useContractReads'
import { VELVET_CAPITAL_PORTFOLIO, VELVET_CAPITAL_BASE_DEPOSIT_MANAGER } from '@/shared/constants'
import createTransactionAlert from '@/utils/createTransactionAlert'

import { depositBatchAbi, depositManagerAbi } from '../abi'
import { useApproveToken, useVelvetRequest } from '../hooks'
import { VelvetTxType, velvetTxSchema } from '../schema/velvet.schema'
import { VelvetDepositResponse, VelvetStatus, VelvetTokenType, VelvetTransactionType } from '../types'

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
  const [batchData, setBatchData] = useState<any>()
  // const [transactionHash, setTransactionHash] = useState<Hash | undefined>()
  const [depositPayload, setDepositPayload] = useState<VelvetDepositResponse | null>(null)

  const { address: userAddress } = useAccount()
  const { contractAddress, decimals, contractAbi } = useContract()
  // const { writeContract } = useWriteContract()
  const { sendTransaction } = useSendTransaction()
  // const { data: transactionCount } = useTransactionCount({
  //   address: userAddress as Hash,
  //   blockTag: 'pending',
  // })

  // const { data: simResult, error: simError } = useSimulateContract({
  //   // address: VELVET_CAPITAL_BASE_DEPOSIT_MANAGER as Hash,
  //   address: '0x6E3e0fe13DAE2C42CCa7ae2E849b0976E2E63e05' as Hash,
  //   abi: depositBatchAbi,
  //   functionName: 'multiTokenSwapAndDeposit',
  //   args: [batchData],
  //   value: BigInt(0),
  //   account: userAddress as Hash,
  //   chainId: base.id,
  //   query: { enabled: Boolean(batchData) },
  // })

  // console.log('simResult =>> ', simResult)
  // console.log('simError =>> ', simError)

  // const {
  //   data: transactionReceipt,
  //   isFetching: isTransactionReceiptFetching,
  //   isError: isTransactionReceiptError,
  //   isSuccess: isTransactionReceiptSuccess,
  // } = useWaitForTransactionReceipt({
  //   hash: transactionHash,
  //   query: {
  //     enabled: !!transactionHash,
  //   },
  // })

  // const onSuccessPrepare = (response: AxiosResponse): void => {
  //   setDepositPayload(response.data)
  //   console.log('transactionCount =>> ', transactionCount)
  //   console.log('estimateGasData =>> ', estimateGasData)

  // const depositAmount = getValues('amount')
  // setStatus('Sending ...')
  // sendTransaction(
  //   {
  //     value: parseEther(depositAmount),
  //     gas: BigInt(response.data.gasLimit),
  //     gasPrice: BigInt(response.data.gasPrice),
  //     to: response.data.to,
  //     data: response.data.data,
  //     chainId: base.id,
  //   },
  //   {
  //     onSuccess: (response) => {
  //       console.log('Transaction sent successfully', response)
  //       setStatus('Processing ...')
  //     },
  //     onError: (error) => {
  //       console.log('Error sending transaction', error)
  //       setStatus('idle')
  //       createTransactionAlert('Error sending deposit transaction', false)
  //     },
  //   },
  // )
  // }

  // const onErrorPrepare = (): void => {
  //   createTransactionAlert('Error preparing deposit transaction', false)
  //   setStatus('idle')
  // }

  // const { mutate: prepareDepositTxMutate } = PrepareDepositTx(onSuccessPrepare, onErrorPrepare)

  // const handlePrepareDepositTx = async () => {
  //   if (!address || isDisconnected) {
  //     createTransactionAlert('User address is not available', false)
  //     return
  //   }
  //   if (!contractAddress) {
  //     createTransactionAlert('Contract address is not available', false)
  //     return
  //   }
  //   if (!decimals) {
  //     createTransactionAlert('Error on contract decimals', false)
  //     return
  //   }

  //   const depositAmount = getValues('amount')

  //   setStatus('Depositing ...')

  //   prepareDepositTxMutate({
  //     portfolio: VELVET_CAPITAL_PORTFOLIO as Hash,
  //     depositToken: contractAddress,
  //     depositAmount: parseUnits(depositAmount, decimals).toString(),
  //     user: address,
  //     depositType: VelvetTransactionType.BATCH,
  //     tokenType: VelvetTokenType.ERC20,
  //   })
  // }

  // const { data: allowanceData, error: allowanceError } = AllowanceBase(VELVET_CAPITAL_BASE_DEPOSIT_MANAGER)

  // const onWriteSuccess = async (response: any) => {
  //   console.log('allowanceData =>> ', allowanceData)
  //   console.log('allowanceError =>> ', allowanceError)

  //   setStatus('Processing ...')
  //   setTransactionHash(response)
  // }

  // const onWriteError = (error: any) => {
  //   setStatus('idle')
  //   createTransactionAlert('Error writing contract', false)
  // }

  const { AllowanceBase, BalanceAssetsBase } = useContractReads(contractAddress as Hash, contractAbi)
  const { PrepareDepositTx } = useVelvetRequest()
  const { approve, isApproving, isApproved } = useApproveToken()

  if (!VELVET_CAPITAL_BASE_DEPOSIT_MANAGER) return // TODO: handle error

  const { isSuccess: isAllowanceSuccess } = AllowanceBase(userAddress, VELVET_CAPITAL_BASE_DEPOSIT_MANAGER, isApproved)

  const { data: balanceAssetsBaseData } = BalanceAssetsBase(userAddress as Hash)

  const { mutate: prepareDepositMutation } = PrepareDepositTx(
    (response: AxiosResponse) => {
      console.log('success response =>> ', response)
      setDepositPayload(response.data)
    },
    (error: AxiosError) => {
      console.log('error response =>> ', error)
      setDepositPayload(null)
    },
  )

  console.log('balanceAssetsBaseData =>> ', balanceAssetsBaseData)

  const onSubmit = async (data: VelvetTxType) => {
    approve(data.amount)
  }

  useEffect(() => {
    if (isApproved && isAllowanceSuccess && decimals) {
      const depositAmount = getValues('amount')
      const parsedDepositAmount = parseUnits(depositAmount, decimals).toString()

      prepareDepositMutation({
        portfolio: VELVET_CAPITAL_PORTFOLIO as Hash,
        depositToken: contractAddress as Hash,
        depositAmount: parsedDepositAmount,
        user: userAddress as Hash,
        depositType: VelvetTransactionType.BATCH,
        tokenType: VelvetTokenType.ERC20,
      })
    }
  }, [isApproved, isAllowanceSuccess, decimals])

  const { data: simResult, error: simError } = useSimulateContract({
    address: VELVET_CAPITAL_BASE_DEPOSIT_MANAGER as Hash,
    abi: depositManagerAbi,
    functionName: 'deposit',
    args: batchData,
    value: BigInt(0),
    chainId: base.id,
    query: { enabled: Boolean(batchData) },
  })

  console.log('simResult =>> ', simResult)
  console.log('simError =>> ', simError)

  useEffect(() => {
    if (simError && depositPayload) {
      const value = decodeErrorResult({
        abi: depositManagerAbi,
        data: (depositPayload?.data as Hash) ?? '',
      })
      console.log('decodedValue =>> ', value)
    }
  }, [simError, depositPayload])

  useEffect(() => {
    if (depositPayload) {
      const iface = new Interface(depositManagerAbi)
      const parsed = iface.parseTransaction({ data: depositPayload?.data })

      parsed !== null && setBatchData(parsed.args)

      // sendTransaction(
      //   {
      //     gas: BigInt(depositPayload.gasLimit),
      //     gasPrice: BigInt(depositPayload.gasPrice),
      //     to: depositPayload.to,
      //     data: depositPayload.data,
      //     chainId: base.id,
      //   },
      //   {
      //     onSuccess: (response) => {
      //       console.log('Transaction sent successfully', response)
      //     },
      //     onError: (error) => {
      //       console.log('Error sending transaction', error)
      //       createTransactionAlert('Error sending deposit transaction', false)
      //     },
      //   },
      // )
    }
  }, [depositPayload])

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

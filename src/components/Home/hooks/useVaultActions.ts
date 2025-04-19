import { useMutation } from '@tanstack/react-query'

import type { AxiosError } from 'axios'

import { erc20Abi, parseUnits } from 'viem'
import type { Hash } from 'viem'

import { useWriteContract, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import type { UseWaitForTransactionReceiptReturnType } from 'wagmi'

import { VelvetTokenType, VelvetTransactionType } from '@/components/TradeBox/velvet-trade-box/types'
import { VELVET_CAPITAL_PORTFOLIO } from '@/shared/constants'

import {
  prepareDepositTxService,
  prepareWithdrawTxService,
} from '../../TradeBox/velvet-trade-box/services/velvet.service'

export const useApproveToken = async (
  userAddress: Hash,
  tokenAddress: Hash,
  spender: Hash,
  amount: string,
  decimals = 18,
) => {
  const { writeContract, data: hash } = useWriteContract()

  await writeContract({
    account: userAddress,
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'approve',
    args: [spender, parseUnits(amount, decimals)],
  })

  const receipt = await useWaitForTransactionReceipt({ hash })

  // Retorna el receipt final
  return receipt
}

/**
 * Deposita fondos (mint shares) y recibe tokens subyacentes
 * @param vault - Dirección del vault
 * @param depositToken - Dirección del token a depositar
 * @param depositAmount - Cantidad a depositar (en unidades mínimas, ej: "1000000" =>\ 1 USDC)
 * @param user - Dirección del usuario que realiza el depósito
 * @param decimals - Decimales del token a depositar
 */
export const useDepositVault = (
  onSuccess: (response: UseWaitForTransactionReceiptReturnType) => void,
  onError: (error: AxiosError) => void,
) => {
  const { writeContract } = useWriteContract()

  return useMutation({
    mutationFn: async (params: { depositToken: Hash; depositAmount: string; user: Hash; decimals: number }) => {
      const { decimals, depositToken, depositAmount, user } = params
      const vault = VELVET_CAPITAL_PORTFOLIO as Hash

      await writeContract({
        account: user,
        address: depositToken,
        abi: erc20Abi,
        functionName: 'approve',
        args: [vault, parseUnits(depositAmount, decimals)],
      })

      const txPayload = await prepareDepositTxService({
        portfolio: VELVET_CAPITAL_PORTFOLIO as Hash,
        depositToken,
        depositAmount: parseUnits(depositAmount, decimals).toString(),
        user,
        depositType: VelvetTransactionType.BATCH,
        tokenType: VelvetTokenType.ERC20,
      })

      if (txPayload === undefined) {
        throw new Error('Transaction payload is undefined')
      }

      const hash = (txPayload as unknown as { hash: Hash }).hash
      const result = useWaitForTransactionReceipt({ hash })

      return result as UseWaitForTransactionReceiptReturnType
    },
    onError,
    onSuccess,
  })
}

/**
 * Retira fondos (burn shares) y recibe tokens subyacentes
 * @param vault - Dirección del vault
 * @param withdrawToken - Dirección del token a retirar
 * @param withdrawAmount - Cantidad a retirar (en unidades mínimas, ej: "1000000" => 1 USDC)
 * @param user - Dirección del usuario que realiza el retiro
 */
export const useWithdrawVault = () => {
  const { sendTransaction } = useSendTransaction()
  return useMutation({
    mutationFn: async (params: {
      vault: Hash
      withdrawToken: Hash
      withdrawAmount: string
      user: Hash
    }): Promise<any> => {
      const { user, withdrawAmount, withdrawToken } = params

      const txPayload = await prepareWithdrawTxService({
        portfolio: VELVET_CAPITAL_PORTFOLIO as Hash,
        withdrawToken,
        withdrawAmount,
        user,
        withdrawType: VelvetTransactionType.BATCH,
        tokenType: VelvetTokenType.ERC20,
      })

      await sendTransaction(txPayload, {
        onError: (error) => {
          console.error('Withdraw Transaction error:', error)
          throw error
        },
        onSuccess: async (hash) => {
          console.log('Withdraw Transaction sent:', hash)
          return hash
        },
      })

      const hash = (txPayload as unknown as { hash: Hash }).hash
      const result = useWaitForTransactionReceipt({ hash })

      return result
    },
  })
}

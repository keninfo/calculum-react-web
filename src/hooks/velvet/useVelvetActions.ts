// hooks/velvet/useVaultActions.ts
import { createConfig, waitForTransactionReceipt } from '@wagmi/core'
// API calls
import { base } from '@wagmi/core/chains'

import { useMutation } from '@tanstack/react-query'

import { erc20Abi, http } from 'viem'
import type { Address } from 'viem'

import { sendTransaction } from 'wagmi/actions'
import { writeContract } from 'wagmi/actions'

import { prepareDepositTx, prepareWithdrawTx } from './velvet.service'

const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
})

/**
 * Ejemplo: depositar tokens a un vault
 */
export function useDepositVault() {
  return useMutation({
    mutationFn: async (params: {
      vault: Address
      depositToken: Address
      depositAmount: string // en unidades mínimas (ej: "1000000" => 1 USDC)
      user: Address
      requireApprove?: boolean
    }) => {
      const { vault, depositToken, depositAmount, user, requireApprove } = params

      // 1) Approve (opcional, si no usas Permit2)
      if (requireApprove) {
        // Por ejemplo, aprobar 9999999999999...
        await writeContract(config, {
          address: depositToken,
          abi: erc20Abi,
          functionName: 'approve',
          args: [vault, BigInt(depositAmount)], // o un amount grande para no repetir
        })
      }

      // 2) Preparar la tx en la API
      const txPayload = await prepareDepositTx({
        vault,
        depositToken,
        depositAmount,
        user,
      })
      // txPayload => { to, data, gasLimit, etc. }

      // 3) Firmar y enviar
      const hash = await sendTransaction(config, txPayload)
      // 4) Esperar confirmación
      return waitForTransactionReceipt(config, { hash })
    },
  })
}

/**
 * Ejemplo: retirar fondos del vault
 */
export function useWithdrawVault() {
  return useMutation({
    mutationFn: async (params: {
      vault: Address
      withdrawToken: Address
      withdrawAmount: string // en vault shares a quemar, o su equivalente
      user: Address
    }) => {
      const { vault, withdrawToken, withdrawAmount, user } = params

      // 1) Preparar la tx en la API
      const txPayload = await prepareWithdrawTx({
        vault,
        withdrawToken,
        withdrawAmount,
        user,
      })

      // 2) Firmar y enviar
      const hash = await sendTransaction(config, txPayload)

      // 3) Esperar confirmación
      return waitForTransactionReceipt(config, { hash })
    },
  })
}

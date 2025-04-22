import type { Hash } from 'viem'

export enum VelvetTransactionType {
  BATCH = 'batch',
}

export enum VelvetTokenType {
  ERC20 = 'erc20',
  NATIVE = 'native',
}
export enum ChainIDType {
  chainID = 8453,
}

export interface VelvetDepositRequest {
  portfolio: Hash
  depositAmount: string
  depositToken: Hash
  user: Hash
  depositType: VelvetTransactionType
  tokenType: VelvetTokenType
  skipApprovalCheck: boolean
  chainID: ChainIDType
}

export interface VelvetWithdrawRequest {
  portfolio: Hash
  withdrawAmount: string
  withdrawToken: Hash
  user: Hash
  withdrawType: VelvetTransactionType
  tokenType: VelvetTokenType
}

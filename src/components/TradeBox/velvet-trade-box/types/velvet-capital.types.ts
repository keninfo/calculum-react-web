import type { Hash } from 'viem'

export enum VelvetTransactionType {
  BATCH = 'batch',
}

export enum VelvetTokenType {
  ERC20 = 'erc20',
  NATIVE = 'native',
}

export interface VelvetDepositRequest_v1 {
  portfolio: Hash
  depositAmount: string
  depositToken: Hash
  user: Hash
  depositType: VelvetTransactionType
  tokenType: VelvetTokenType
  skipApprovalCheck: boolean
  chainID: number
}

export interface VelvetDepositRequest_v3 {
  portfolio: Hash
  depositAmount: string
  depositToken: Hash
  user: Hash
  depositType: VelvetTransactionType
  tokenType: VelvetTokenType
}

export interface VelvetApiResponse_v3 {
  to: Hash
  data: Hash
  gasLimit: string
  gasPrice: string
}

export interface VelvetApiResponse_v1 {
  to: Hash
  data: Hash
  gasLimit: string
  gasPrice: string
  value: string
}

export interface VelvetWithdrawRequest_v1 {
  portfolio: Hash
  withdrawAmount: string
  withdrawToken: Hash
  user: Hash
  slippage: string
  withdrawType: VelvetTransactionType
  tokenType: VelvetTokenType
  skipApprovalCheck: boolean
  chainID: number
}

export interface VelvetWithdrawRequest_v3 {
  portfolio: Hash
  withdrawAmount: string
  withdrawToken: Hash
  user: Hash
  withdrawType: VelvetTransactionType
  tokenType: VelvetTokenType
}

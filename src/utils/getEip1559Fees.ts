import { publicClientBase } from '@/config/viem-client/ViemClient'

export const getEip1559Fees = async () => {
  const { maxFeePerGas, maxPriorityFeePerGas } = await publicClientBase.estimateFeesPerGas({
    type: 'eip1559',
  })
  return { maxFeePerGas, maxPriorityFeePerGas }
}

import { publicClientBase } from '@/config/viem-client/ViemClient'
import { estimateFeesPerGas } from '@wagmi/core'

export const getEip1559Fees = async () => {
  const { maxFeePerGas, maxPriorityFeePerGas } =
    await publicClientBase.estimateFeesPerGas({
      type: 'eip1559',
    })
  return { maxFeePerGas, maxPriorityFeePerGas }
}


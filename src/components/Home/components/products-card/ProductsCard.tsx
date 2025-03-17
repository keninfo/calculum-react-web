/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useStrategyStore } from '@/store/useStrategyStore'

interface ProductsCardProps {
  isWorking: boolean
  strategy: string
  coin: string
  abi: any // TODO: Fix this type
  address: string
  chainId: string
  chain: string
  symbol: string
  icon: string
  chainIcon?: string
  info: string
}

const ProductsCard: FC<ProductsCardProps> = ({ isWorking, strategy, coin, chain, symbol, icon, chainIcon }) => {
  const router = useRouter()
  const { setStrategy, setCoin } = useStrategyStore()

  const goTo = (strategy: string, coin: string) => {
    setStrategy(strategy)
    setCoin(coin)
    localStorage.setItem('strategy', JSON.stringify(strategy))
    localStorage.setItem('coin', JSON.stringify(coin))

    router.push('/dashboard')
  }

  return (
    <div
      className="grid-col-1 grid cursor-pointer items-center justify-between gap-7 rounded-lg border border-gray-200 p-4 transition duration-200 ease-in-out hover:border-[#C1EA60] md:grid-cols-2"
      onClick={() => goTo(strategy, coin)}
    >
      <div>
        <p className="text-sm text-[#7F7F7F]">Token</p>
        <div className="flex items-center space-x-2">
          <Image src={icon ?? ''} width={20} height={20} alt={chain} />
          <p className="text-xl">{symbol}</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-[#7F7F7F]">Chain</p>
        <div className="flex items-center space-x-2">
          <Image src={chainIcon ?? ''} width={20} height={20} alt={chain} />
          <p className="text-xl">{chain}</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-[#7F7F7F]">Strategy</p>
        <p>{strategy}</p>
      </div>
      <div>
        {!isWorking && <p className="text-sm text-[#7F7F7F]">Coming Soon</p>}
        <div className="flex items-center space-x-2">
          {!isWorking && <p className="text-xl">Preview</p>}
          <Image
            src={isWorking ? '/icons/external_arrow_green.svg' : '/icons/external_arrow_gray.svg'}
            width={20}
            height={20}
            alt="Preview"
          />
        </div>
      </div>
    </div>
  )
}
export default ProductsCard

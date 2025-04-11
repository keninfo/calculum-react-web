/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useStrategyStore } from '@/store/useStrategyStore'

import { twMerge } from 'tailwind-merge'

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
      className={twMerge(
        'box-border grid cursor-pointer grid-cols-2 items-center justify-between gap-3 rounded-lg border border-[transparent] p-4 transition duration-200 ease-in-out hover:border-[#C1EA60] md:grid-cols-2 md:gap-7',
        isWorking ? 'bg-[#013537]' : 'bg-[#0F0F0F]',
      )}
      onClick={() => goTo(strategy, coin)}
    >
      <div>
        <p className="text-sm text-[#878787]">Token</p>
        <div className="flex items-center space-x-2">
          <Image src={icon ?? ''} width={20} height={20} alt={chain} />
          <p className="text-xl">{symbol}</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-[#878787]">Chain</p>
        <div className="flex items-center space-x-2">
          <Image src={chainIcon ?? ''} width={20} height={20} alt={chain} />
          <p className="text-xl">{chain}</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-[#878787]">Strategy</p>
        <p>{strategy}</p>
      </div>
      <div>
        {!isWorking ? (
          <p className="text-sm text-[#878787]">Coming Soon</p>
        ) : (
          <p className="text-sm text-[#878787]">Annual Target</p>
        )}
        <div className="flex items-center space-x-2">
          {!isWorking ? <p className="text-xl text-[#878787]">Preview</p> : <p className="text-xl">{'>10%'}</p>}
        </div>
      </div>
    </div>
  )
}
export default ProductsCard

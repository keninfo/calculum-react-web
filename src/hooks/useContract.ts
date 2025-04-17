// useContract.ts
import { useEffect, useState } from 'react'

import type { Abi, Hash } from 'viem'

import type { contractType } from '@/contracts/contractIndex'
import { contractIndex } from '@/contracts/contractIndex'
import { contractSmoothcoinBTC } from '@/contracts/smoothcoinBTC'
import { useStrategyStore } from '@/store/useStrategyStore'

const useContract = () => {
  const { coin, strategy } = useStrategyStore()
  const [contractData, setContractData] = useState<contractType>({
    isWorking: true,
    strategy: 'Smoothcoin',
    coin: 'BTC',
    abi: contractSmoothcoinBTC.abi as Abi,
    address: contractSmoothcoinBTC.address as Hash,
    chainId: contractSmoothcoinBTC.chainId,
    chain: 'Arbitrum (Testnet)',
    symbol: 'smBTC',
    icon: '/bearLogo.png',
    chainIcon: '',
    info: '',
    decimals: 0,
  })

  useEffect(() => {
    const matchingContract = contractIndex.find((contract) => contract.coin === coin && contract.strategy === strategy)

    setContractData(matchingContract as contractType)
  }, [coin, strategy])

  return {
    contractAddress: contractData.address,
    contractAbi: contractData.abi,
    isWorking: contractData.isWorking,
    chainId: contractData.chainId,
    symbol: contractData.symbol,
    icon: contractData.icon,
    info: contractData.info,
    chain: contractData.chain,
    strategy: contractData.strategy,
    coin: contractData.coin,
    chainIcon: contractData.chainIcon,
    decimals: contractData.decimals,
  }
}

export default useContract

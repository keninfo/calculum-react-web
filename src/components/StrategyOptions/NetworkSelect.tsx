import React from 'react'

import { arbitrumSepolia } from 'viem/chains'

import { useAccount } from 'wagmi'

import Select from '@/components/common/Select'
import { useStrategyStore } from '@/store/useStrategyStore'

const networks = ['Arbitrum Sepolia']

const NetworkSelect = () => {
  const { network, setNetwork } = useStrategyStore()
  const { chainId } = useAccount()

  return (
    <>
      {chainId != arbitrumSepolia.id ? (
        <Select
          value={'Unsupported Network'}
          options={['Unsupported Network']}
          handleChange={() => console.log('Unsupported')}
          disabled
        />
      ) : (
        <Select value={network} options={networks} handleChange={(e) => setNetwork(e.target.value)} />
      )}
    </>
  )
}

export default NetworkSelect

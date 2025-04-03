import React from 'react'

import { useSelectionStore } from './useSelectionStore'

import { twMerge } from 'tailwind-merge'

const tokens = ['All Tokens', 'BTC', 'ETH', 'DOGE', 'PEPE', 'PAXG']
// const chains = [['Arbitrum (Testnet)', 'arb-logo.png'], ['Base', 'base.svg'], ['Mantle (Testnet)', 'mantle.png']]

const SelectionCard = () => {
  const { selectedToken, setSelectedToken } = useSelectionStore()

  return (
    <div className="flex items-center justify-start space-x-2 text-xs md:text-lg">
      {tokens.map((item) => {
        return (
          <button
            key={item}
            className={twMerge(
              'rounded-full px-4 py-1 transition duration-200 ease-in-out hover:bg-eerie',
              selectedToken === item && 'bg-black',
            )}
            onClick={() => setSelectedToken(item)}
          >
            {item}
          </button>
        )
      })}
    </div>
  )
}

export default SelectionCard

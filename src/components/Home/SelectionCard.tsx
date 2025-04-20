import React from 'react'

import { useSelectionStore } from './useSelectionStore'

import { twMerge } from 'tailwind-merge'

const tokens = ['All Tokens', 'BTC', 'ETH', 'DOGE', 'PEPE', 'PAXG']
// const chains = [['Arbitrum (Testnet)', 'arb-logo.png'], ['Base', 'base.svg'], ['Mantle (Testnet)', 'mantle.png']]

const SelectionCard = () => {
  const { selectedToken, setSelectedToken } = useSelectionStore()

  return (
    <>
      <div className="mb-5 flex flex-wrap justify-center md:hidden">
        <button
          className={twMerge(
            'rounded-full px-4 py-1 text-sm transition duration-200 ease-in-out md:text-base',
            selectedToken === 'All Tokens' && 'bg-primary text-black',
          )}
          onClick={() => setSelectedToken('All Tokens')}
        >
          View All Tokens
        </button>
        <span className="text-sm">Or filter products by token below</span>
      </div>
      <div className="flex items-center justify-start overflow-x-auto text-xs md:space-x-2 md:text-lg">
        {tokens.map((item) => {
          return (
            <button
              key={item}
              className={twMerge(
                'rounded-full px-4 py-1 text-sm transition duration-200 ease-in-out md:text-base',
                selectedToken === item && 'bg-primary text-black',
                item === 'All Tokens' && 'hidden md:block',
              )}
              onClick={() => setSelectedToken(item)}
            >
              {item}
            </button>
          )
        })}
      </div>
    </>
  )
}

export default SelectionCard

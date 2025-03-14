import React from 'react'

import Card from '../common/Card'
import CryptoIcon from '../common/CryptoIcon'
import { useSelectionStore } from './useSelectionStore'

const tokens = ['BTC', 'ETH', 'DOGE', 'PEPE']
// const chains = [['Arbitrum (Testnet)', 'arb-logo.png'], ['Base', 'base.svg'], ['Mantle (Testnet)', 'mantle.png']]

const SelectionCard = () => {
  const { selectedToken, setSelectedToken } = useSelectionStore()

  return (
    <Card className="w-full !py-4 !pl-2">
      <div className="fade-mask-right flex items-center justify-start space-x-2 overflow-scroll text-xs md:text-lg">
        <button
          className={`flex items-center justify-center rounded-full px-4 py-1 transition duration-200 ease-in-out hover:bg-eerie ${selectedToken == 'All Tokens' ? 'text-primary' : ''} text-nowrap`}
          onClick={() => setSelectedToken('All Tokens')}
        >
          ALL TOKENS
        </button>
        <p className="hidden md:block">|</p>
        {tokens.map((item) => {
          return (
            <button
              key={item}
              className={`flex items-center justify-center rounded-full px-4 py-1 transition duration-200 ease-in-out hover:bg-eerie ${selectedToken == item ? 'text-primary' : ''}`}
              onClick={() => setSelectedToken(item)}
            >
              <CryptoIcon coin={item} className="-ml-2 mr-1 h-5" />
              <p>{item}</p>
            </button>
          )
        })}
      </div>
      {/* <div className='flex justify-start items-center mt-4'>
        <button className='flex justify-center items-center  rounded-xl px-4 py-1 border-primary'>ALL CHAINS</button>
        <p>
          <b style={{ whiteSpace: "pre-wrap" }}>{" "}</b>|</p>
        {chains.map((item) => {
          return <button className='flex justify-center items-center  rounded-xl px-4 py-1'>
            <img
              src={item[1]}
              alt="coin icon"
              className='h-5 mr-2'
            />
            <p>{item[0]}</p>
          </button>
        })
        }
      </div> */}
    </Card>
  )
}

export default SelectionCard

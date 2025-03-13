'use client'

import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { contractIndex } from '@/contracts/contractIndex'
import { useNavbarStore } from '@/store/useNavbarStore'
import { useStrategyStore } from '@/store/useStrategyStore'

import InitialPopup from '../InitialPopup'
import Card from '../common/Card'
import CryptoIcon from '../common/CryptoIcon'
import SelectionCard from './SelectionCard'
import { WelcomeCard } from './WelcomeCard'
import { useSelectionStore } from './useSelectionStore'

const chains = [
  ['Arbitrum (Testnet)', '/arb-logo.png'],
  ['Base', '/base.svg'],
  ['Mantle (Testnet)', '/mantle.png'],
]

const Index = () => {
  const { navbarHeight } = useNavbarStore()
  const [modal, setModal] = useState<boolean>(false)
  const router = useRouter()
  const { setStrategy, setCoin } = useStrategyStore()

  const { selectedStrategy, selectedToken } = useSelectionStore()

  useEffect(() => {
    const hasAnswered = localStorage.getItem('userResponse')
    if (!hasAnswered) {
      setModal(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const goTo = (strategy: string, coin: string) => {
    setStrategy(strategy)
    setCoin(coin)
    localStorage.setItem('strategy', JSON.stringify(strategy))
    localStorage.setItem('coin', JSON.stringify(coin))

    router.push('/dashboard')
  }

  return (
    <>
      {modal && <InitialPopup setModal={setModal} />}
      <div className="h-full px-10 md:px-0" style={{ marginTop: navbarHeight }}>
        <div className="relative flex items-start justify-between space-x-4">
          <div className="w-2/3">
            <WelcomeCard />
            <SelectionCard />
            <Card className="mt-4 w-full">
              <p>PRODUCTS</p>
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="py-2 text-left text-sm font-medium text-grey">Token</th>
                    <th className="py-2 text-left text-sm font-medium text-grey">Strategy</th>
                    {/* <th className="py-2 text-left text-sm font-medium text-grey">Symbol</th> */}
                    <th className="py-2 text-left text-sm font-medium text-grey">Chain</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {contractIndex.map((contract, index) => {
                    const chainLogo = chains.find(([name]) => name === contract.chain)?.[1]
                    if (selectedToken !== 'All Tokens') {
                      if (!contract.coin.includes(selectedToken)) {
                        return
                      }
                    }
                    return (
                      <tr
                        key={index}
                        onClick={() => goTo(contract.strategy, contract.coin)}
                        className="cursor-pointer !rounded-full font-thin transition duration-200 ease-in-out hover:bg-eerie"
                      >
                        <td className="w-fit text-sm">
                          <div className="flex w-fit items-center justify-start">
                            <CryptoIcon coin={contract.coin} className="mr-2 h-5" />
                            <p>{contract.coin}</p>
                          </div>
                        </td>
                        <td className="w-fit py-2 text-sm">{contract.strategy}</td>
                        {/* <td className="py-2 text-sm ">{contract.symbol}</td> */}
                        <td className="w-fit text-sm">
                          <div className="flex w-fit items-center justify-start">
                            {chainLogo && <img src={chainLogo} alt="chain logo" className="mr-2 h-5 w-5" />}
                            <p className={`${contract.chain == 'Coming Soon' ? 'text-payne' : ''}`}>{contract.chain}</p>
                          </div>
                        </td>
                        <td className="w-18 pr-2 text-right">
                          {contract.chain !== 'Coming Soon' && (
                            <FontAwesomeIcon
                              icon={['fas', 'angle-right' as IconName]}
                              className="ml-1 text-xs font-thin text-grey"
                            />
                          )}
                          {contract.chain == 'Coming Soon' && (
                            <p className="text-xs text-payne">
                              {' '}
                              Preview <FontAwesomeIcon icon={['fas', 'angle-right' as IconName]} className="ml-1" />
                            </p>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </Card>
          </div>
          <div className="sticky w-1/3 space-y-4" style={{ top: navbarHeight }}>
            {/* <div className='h-full col-span-1' onClick={() => setSelectedStrategy('All Strategies')}>
              <Card className={`h-full cursor-pointer  hover:bg-eerie w-full flex justify-start items-start border ${selectedStrategy == 'All Strategies' ? 'border-primary' : 'border-dark'}`}>
                <h2 className='text-xl'>ALL STRATEGIES</h2>
              </Card>
            </div> */}
            <a className="h-full w-full" href="https://docs.hodlprotocol.io/hodl-101/what-is-momentum" target="_blank">
              <Card
                className={`h-full w-full cursor-pointer border transition duration-200 ease-in-out hover:bg-eerie ${selectedStrategy == 'Momentum' ? 'border-primary' : 'border-dark'}`}
              >
                <h2 className="mb-2 text-xl">MOMENTUM</h2>
                <p className="text-xs font-thin">
                  Instead of passively `hodling` through market cycles, this 30-year-old strategy automatically adjusts
                  your exposure based on trend.
                </p>
                <Image
                  src={'charts/momentum_chart.svg'}
                  alt={''}
                  height={1000}
                  width={1000}
                  priority
                  className="relative mt-4 h-[90%] w-full"
                />
              </Card>
            </a>

            <a
              className="h-full w-full"
              href="https://docs.hodlprotocol.io/hodl-101/what-are-smoothcoins"
              target="_blank"
            >
              <Card
                className={`mt-4 h-full w-full cursor-pointer border transition duration-200 ease-in-out hover:bg-eerie ${selectedStrategy == 'Smoothcoins' ? 'border-primary' : 'border-dark'}`}
              >
                <h2 className="mb-2 text-xl">SMOOTHCOINS</h2>
                <p className="text-xs font-thin">
                  SmoothCoins are tokens designed to stabilize your portfolio by reducing the impact of market
                  volatility. They balance risk and reward, offering a middle ground between high volatility assets and
                  stablecoins.
                </p>
                <Image
                  src={'charts/smoothcoin_chart.svg'}
                  alt={''}
                  height={1000}
                  width={1000}
                  priority
                  className="relative mt-4 h-[90%] w-full"
                />
              </Card>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index

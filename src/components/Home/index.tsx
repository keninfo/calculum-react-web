'use client'

// import type { IconName } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'

// import { useRouter } from 'next/navigation'
import { contractIndex } from '@/contracts/contractIndex'
import { useNavbarStore } from '@/store/useNavbarStore'

// import { useStrategyStore } from '@/store/useStrategyStore'
// import InitialPopup from '../InitialPopup'
import Card from '../common/Card'
// import CryptoIcon from '../common/CryptoIcon'
import SelectionCard from './SelectionCard'
import { ProductCardMock, ProductsCard } from './components/products-card'
import { useSelectionStore } from './useSelectionStore'

// const ITEMS_PER_PAGE = 5

// const chains = [
//   ['Arbitrum (Testnet)', '/arb-logo.png'],
//   ['Base', '/base.svg'],
//   ['Mantle (Testnet)', '/mantle.png'],
// ]

const Index = () => {
  const { navbarHeight } = useNavbarStore()
  // const [modal, setModal] = useState<boolean>(false)
  // const router = useRouter()
  // const { setStrategy, setCoin } = useStrategyStore()

  const { selectedStrategy, selectedToken } = useSelectionStore()

  const [loading, setLoading] = useState(true)
  // const [currentPage, setCurrentPage] = useState(1)

  // useEffect(() => {
  //   const hasAnswered = localStorage.getItem('userResponse')
  //   if (!hasAnswered) {
  //     setModal(true)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // const goTo = (strategy: string, coin: string) => {
  //   setStrategy(strategy)
  //   setCoin(coin)
  //   localStorage.setItem('strategy', JSON.stringify(strategy))
  //   localStorage.setItem('coin', JSON.stringify(coin))

  //   router.push('/dashboard')
  // }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000) // Simulating loading delay
  }, [])

  // const filteredContracts = contractIndex.filter(
  //   (contract) => selectedToken === 'All Tokens' || contract.coin.includes(selectedToken),
  // )

  // const totalPages = Math.ceil(filteredContracts.length / ITEMS_PER_PAGE)
  // const displayedContracts = filteredContracts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>
  }

  return (
    <>
      {/* {modal && <InitialPopup setModal={setModal} />} */}
      <div className="h-full px-10 md:px-0" style={{ marginTop: navbarHeight }}>
        {/* <InfoCarousel /> */}
        <div className="relative flex flex-col gap-5 md:grid md:grid-cols-12 md:space-x-4">
          <div className="order-2 flex h-full flex-col md:order-1 md:col-span-8">
            <SelectionCard />
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {contractIndex.map((contract, index) => {
                if (selectedToken !== 'All Tokens') {
                  if (!contract.coin.includes(selectedToken)) {
                    return
                  }
                }
                return <ProductsCard key={index} {...contract} />
              })}
              {selectedToken === 'All Tokens' && <ProductCardMock />}
            </div>

            {/* TODO: Check this component */}
            {/* <div className="mb-8 mt-4 w-full space-y-4 md:hidden">
              <p className="p-4 text-center text-lg font-semibold">PRODUCTS</p>
              {displayedContracts
                .filter((contract) => selectedToken === 'All Tokens' || contract.coin.includes(selectedToken))
                .map((contract, index) => {
                  const chainLogo = chains.find(([name]) => name === contract.chain)?.[1]
                  return (
                    <a key={index} onClick={() => goTo(contract.strategy, contract.coin)}>
                      <Card className="mt-2 w-full cursor-pointer transition duration-200 ease-in-out hover:bg-eerie">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <CryptoIcon coin={contract.coin} className="mr-2 h-6" />
                            <p className="font-medium">
                              {contract.coin} - {contract.strategy}
                            </p>
                          </div>
                          {contract.chain !== 'Coming Soon' ? (
                            <FontAwesomeIcon
                              icon={['fas', 'angle-right' as IconName]}
                              className="text-xs font-thin text-grey"
                            />
                          ) : (
                            <p className="text-xs text-payne">
                              Preview
                              <FontAwesomeIcon icon={['fas', 'angle-right' as IconName]} className="ml-1" />
                            </p>
                          )}
                        </div>
                        <div className="ml-1 mt-4 flex items-center">
                          {chainLogo && <img src={chainLogo} alt="chain logo" className="mr-2 h-5 w-5" />}
                          <p className={`text-xs ${contract.chain === 'Coming Soon' ? 'text-grey' : 'text-offWhite'}`}>
                            {contract.chain}
                          </p>
                        </div>
                      </Card>
                    </a>
                  )
                })}
              {totalPages > 1 && (
                <div className="mt-4 flex justify-center space-x-4">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="rounded bg-dark px-3 py-1 disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="rounded bg-dark px-3 py-1 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div> */}
            {/* TODO: Check this component */}
          </div>

          <div className="order-1 space-y-4 md:sticky md:order-2 md:col-span-4" style={{ top: navbarHeight }}>
            {/* <div className='h-full col-span-1' onClick={() => setSelectedStrategy('All Strategies')}>
              <Card className={`h-full cursor-pointer  hover:bg-eerie w-full flex justify-start items-start border ${selectedStrategy == 'All Strategies' ? 'border-primary' : 'border-dark'}`}>
              </Card>
            </div> */}
            <h2 className="mb-8 text-lg md:text-xl">Our Strategies</h2>
            <div className="flex flex-col gap-4 pb-9 text-[#a5a5a5]">
              <p>
                HODL brings two categories of time-tested strategies onchain: Open-Source and Hedge Fund Manager Series.
                Each strategy is designed for specific market conditions—whether it’s trending markets or
                high-volatility phases—targeting token-denominated growth above of 10% p.a. over time.
              </p>
              <p>
                Our first live strategy, Momentum, leads the Open-Source Series, helping users navigate market cycles
                with a systematic approach. More strategies are launching soon, expanding your options for smarter, more
                resilient crypto holdings.
              </p>
              <a href="/#" className="flex items-center gap-2">
                Learn more about our strategies{' '}
                <Image src="/icons/external_arrow_green.svg" alt={''} width={20} height={20} />
              </a>
            </div>
            <a className="h-full w-full" href="https://docs.hodlprotocol.io/hodl-101/what-is-momentum" target="_blank">
              <Card
                className={`h-fit w-full cursor-pointer border !bg-[#013537] transition duration-200 ease-in-out hover:bg-eerie ${selectedStrategy == 'Momentum' ? 'border-primary' : 'border-dark'}`}
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

            {/* <a
              className="h-full w-full"
              href="https://docs.hodlprotocol.io/hodl-101/what-are-smoothcoins"
              target="_blank"
            >
              <Card
                className={`mt-4 h-fit w-full cursor-pointer border transition duration-200 ease-in-out hover:bg-eerie ${selectedStrategy == 'Smoothcoins' ? 'border-primary' : 'border-dark'}`}
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
            </a> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Index

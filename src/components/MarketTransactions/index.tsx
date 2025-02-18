/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'

import { MarketTransactionMobileCard } from './components/market-transaction-mobile-card'
import { MarketTransactionDesktopTable } from './components/market-transactions-desktop-table'
import { useMarketTransactionsRequest } from './hooks'

const ITEMS_PER_PAGE = 10

const MarketTransactions = () => {
  const { fetchLogs, isLoading, transactions } = useMarketTransactionsRequest()

  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    fetchLogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.count('market transactions')

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE)
  const currentTransactions = transactions.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  if (isLoading) {
    return <p className="py-5 text-center">Loading...</p>
  }

  return (
    <div className="h-full w-full">
      {currentTransactions.length === 0 ? (
        <p className="py-5 text-center text-grey">No transactions found.</p>
      ) : (
        <>
          <div className="w-full">
            <div className="hidden overflow-x-auto md:block">
              <MarketTransactionDesktopTable transactions={currentTransactions} />
            </div>
            <div className="space-y-4 md:hidden">
              {currentTransactions.map((log, index) => (
                <MarketTransactionMobileCard key={`market-transaction-mobile-card__${index}`} log={log} />
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-4 py-2 hover:text-primary disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 hover:text-primary disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default MarketTransactions

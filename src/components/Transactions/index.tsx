/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'

import { TransactionCardMobile } from './components/transaction-card-mobile'
import { TransactionTableDesktop } from './components/transaction-table-desktop'
import { useTransactionRequest } from './hooks'

const ITEMS_PER_PAGE = 10

const Transactions = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { fetchLogs, isLoading, transactions } = useTransactionRequest()

  useEffect(() => {
    fetchLogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE)
  const currentTransactions = transactions.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  if (isLoading) {
    return <p className="mt-4 text-center">Loading...</p>
  }

  return (
    <>
      {currentTransactions.length === 0 ? (
        <p className="py-4 text-center text-grey">No transactions found.</p>
      ) : (
        <div className="h-full w-full">
          <div className="hidden w-full md:block">
            <div className="block overflow-x-auto">
              <TransactionTableDesktop transactions={currentTransactions} />
            </div>
          </div>
          <div className="h-full w-full md:hidden">
            <div className="space-y-4">
              {currentTransactions.map((log, index) => (
                <TransactionCardMobile key={`transaction-car-mobile__${index}`} log={log} />
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-4 py-2 hover:text-primary disabled:opacity-50"
              >
                Prev
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
          </div>
        </div>
      )}
    </>
  )
}

export default Transactions

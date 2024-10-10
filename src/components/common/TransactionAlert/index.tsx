import React, { useEffect } from 'react'

import ReactDOM from 'react-dom'

interface TransactionAlertProps {
  message: string
  confirmed: boolean
  onDestroy: () => void
}

const TransactionAlert: React.FC<TransactionAlertProps> = ({ message, confirmed, onDestroy }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDestroy()
    }, 3000) // Display popup for 3 seconds

    return () => clearTimeout(timer)
  }, [onDestroy])

  return ReactDOM.createPortal(
    <div
      className={`fixed bottom-4 right-4 transform rounded p-3 shadow transition-all duration-500 ${
        confirmed ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}
    >
      {message}
    </div>,
    document.body,
  )
}

export default TransactionAlert

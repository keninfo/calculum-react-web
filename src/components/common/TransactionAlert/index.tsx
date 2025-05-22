import React, { useEffect } from 'react'

import ReactDOM from 'react-dom'

/** * Properties for the `TransactionAlert` component. */
interface TransactionAlertProps {
  /** * Message to be displayed in the alert. */
  message: string

  /** * Flag indicating if the transaction is confirmed. */
  confirmed: boolean

  /** * Callback function to destroy the alert. */
  onDestroy: () => void
}

/**
 * A component to display a transaction alert.
 *
 * @remarks
 * This component is created when a utility function is called from any other component
 * to trigger the transaction alert display.
 *
 * @param message - The message to display in the alert.
 * @param confirmed - Flag to indicate if the transaction is confirmed.
 * @param onDestroy - Callback function to be called after the alert is dismissed.
 * @returns The transaction alert component displayed as a portal.
 */
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
        confirmed ? 'bg-spring text-offWhite' : 'bg-fire text-offWhite'
      }`}
    >
      {message}
    </div>,
    document.body,
  )
}

export default TransactionAlert

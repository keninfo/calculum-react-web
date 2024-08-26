import React from 'react'

import TransactionAlert from '@/components/common/TransactionAlert'

import { createRoot } from 'react-dom/client'

const createTransactionAlert = (message: string, confirmed: boolean): void => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const root = createRoot(container)

  const onDestroy = () => {
    root.unmount()
    document.body.removeChild(container)
  }

  root.render(React.createElement(TransactionAlert, { message, confirmed, onDestroy }))
}

export default createTransactionAlert

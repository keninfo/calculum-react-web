import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React, { useState } from 'react'

import Card from '@/components/common/Card'

const Help = () => {
  const [closed, setClosed] = useState<boolean>(false)

  if (closed) {
    return
  }
  return (
    <Card className="relative flex items-center justify-center gap-6 overflow-hidden !bg-offWhite text-dark">
      <div className="absolute right-0 top-0 flex h-full w-1/12 cursor-pointer items-center justify-center bg-primary text-dark">
        <p onClick={() => setClosed(true)}>
          <FontAwesomeIcon icon={['fas', 'xmark' as IconName]} />
        </p>
      </div>
      <p className="text-3xl">
        <FontAwesomeIcon icon={['fas', 'book-bookmark' as IconName]} />
      </p>
      <div>
        <h3 className="text-md font-bold">Need help?</h3>
        <p className="w-10/12 text-xs">
          Checkout out out step-by-step guides in{' '}
          <a className="underline" href="https://docs.hodlprotocol.io/" target="_blank">
            RESOURCES
          </a>
        </p>
      </div>
    </Card>
  )
}

export default Help

import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React from 'react'

import Card from '@/components/common/Card'

const Help = () => {
  return (
    <Card className="flex items-center justify-center gap-6 !bg-offWhite text-dark">
      <p className="text-3xl">
        {' '}
        <FontAwesomeIcon icon={['fas', 'book-bookmark' as IconName]} />
      </p>
      <div>
        <h3 className="text-md font-bold">Need help?</h3>
        <p className="text-xs">
          Checkout out out step-by-step guides under{' '}
          <a className="underline" href="https://docs.hodlprotocol.io/" target="_blank">
            RESOURCES
          </a>
        </p>
      </div>
    </Card>
  )
}

export default Help

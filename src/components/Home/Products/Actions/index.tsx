import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React from 'react'

import { Button } from '@mui/base/Button'

library.add(fas)

const index = () => {
  return (
    <div>
      <Button className="text-white bg-carmesi p-2 px-3 mx-2 rounded-lg">
        <FontAwesomeIcon icon={['fas', 'plus' as IconName]} />
      </Button>
      <Button className="text-white bg-carmesi p-2 px-3 mx-2 rounded-lg">
        <FontAwesomeIcon icon={['fas', 'minus' as IconName]} />
      </Button>
      <Button className="text-white bg-carmesi p-2 px-3 mx-2 rounded-lg">
        <FontAwesomeIcon icon={['fas', 'arrow-right-arrow-left' as IconName]} />
      </Button>
      <Button className="text-white bg-carmesi p-2 px-3 mx-2 rounded-lg">
        <FontAwesomeIcon icon={['fas', 'arrows-rotate' as IconName]} />
      </Button>
    </div>
  )
}

export default index

import { library } from '@fortawesome/fontawesome-svg-core'
import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWeb3Modal } from '@web3modal/wagmi/react'

import { Button } from '@mui/base'

import { useAccount, useDisconnect } from 'wagmi'

library.add(fas)

const SmallConnectButton = () => {
  const { open } = useWeb3Modal()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const handleClick = () => {
    if (isConnected) {
      disconnect()
    } else {
      open()
    }
  }

  return (
    <Button onClick={handleClick}>
      {isConnected ? (
        <p className="text-white flex items-center">
          <FontAwesomeIcon icon={['fas', 'link-slash' as IconName]} className="h-[4vh]" />
        </p>
      ) : (
        <p className="text-white flex items-center">
          <FontAwesomeIcon icon={['fas', 'wallet' as IconName]} className="h-[4vh]" />
        </p>
      )}
    </Button>
  )
}

export default SmallConnectButton

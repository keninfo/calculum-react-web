import { library } from '@fortawesome/fontawesome-svg-core'
import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWeb3Modal } from '@web3modal/wagmi/react'

import { useAccount, useDisconnect } from 'wagmi'

import ClearButton from '@/components/common/ClearButton'

library.add(fas)

const SmallConnectButton = () => {
  const { open } = useWeb3Modal()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <ClearButton handleClickClearButton={isConnected ? () => disconnect() : () => open()}>
      {isConnected ? (
        <p>
          {' '}
          <FontAwesomeIcon icon={['fas', 'link-slash' as IconName]} />
        </p>
      ) : (
        <p>
          {' '}
          <FontAwesomeIcon icon={['fas', 'wallet' as IconName]} />
        </p>
      )}
    </ClearButton>
  )
}

export default SmallConnectButton

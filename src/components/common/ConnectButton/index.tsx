import { useWeb3Modal } from '@web3modal/wagmi/react'

import { useAccount, useDisconnect } from 'wagmi'

import ClearButton from '@/components/common/ClearButton'
import { shortenAddress } from '@/utils/formatters'

const ConnectButton = () => {
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <ClearButton handleClickClearButton={isConnected ? () => disconnect() : () => open()}>
      {isConnected ? <p>{shortenAddress(address)}</p> : <p>Connect Wallet</p>}
    </ClearButton>
  )
}

export default ConnectButton

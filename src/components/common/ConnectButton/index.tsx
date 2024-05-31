import { useWeb3Modal } from '@web3modal/wagmi/react'

import { useAccount, useDisconnect } from 'wagmi'

import ClearButton from '@/components/common/ClearButton'

const ConnectButton = () => {
  const { open } = useWeb3Modal()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <ClearButton handleClickClearButton={isConnected ? () => disconnect() : () => open()}>
      {isConnected ? <p className="text-[.8vw]">Disconnect Wallet</p> : <p className="text-[1vw]">Connect Wallet</p>}
    </ClearButton>
  )
}

export default ConnectButton

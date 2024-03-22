import { Typography } from '@mui/material'

import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useDisconnect } from 'wagmi'

import ClearButton from '@/components/common/ClearButton'
import { shortenAddress } from '@/utils/formatters'

const ConnectButton = () => {
  const { open } = useWeb3Modal()
  const { address, isConnected, status } = useAccount()
  const { disconnect } = useDisconnect()

  console.log({ status })

  return (
    <ClearButton handleClickClearButton={isConnected ? () => disconnect() : () => open()}>
      {isConnected ? <Typography>{shortenAddress(address)}</Typography> : <Typography>Connect Wallet</Typography>}
    </ClearButton>
  )
}

export default ConnectButton

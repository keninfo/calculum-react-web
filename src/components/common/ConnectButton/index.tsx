import { useWeb3Modal } from '@web3modal/wagmi/react'

import { Button } from '@mui/base'

import { useAccount, useDisconnect } from 'wagmi'

import { shortenAddress } from '@/utils/formatters'

const ConnectButton = () => {
  const { open } = useWeb3Modal()
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <Button
      onClick={isConnected ? () => disconnect() : () => open()}
      className="bg-smoke py-[2vh] px-[4vw] w-full flex justify-center rounded-xl text-white  hover:scale-110  hover:text-carmesi"
    >
      {isConnected ? (
        <p className="text-[.8vw]">Disconnect {shortenAddress(address)}</p>
      ) : (
        <p className="text-[1vw]">Connect Wallet</p>
      )}
    </Button>
  )
}

export default ConnectButton

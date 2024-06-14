import { useWeb3Modal } from '@web3modal/wagmi/react'

import { Button } from '@mui/base'

import { useAccount, useDisconnect } from 'wagmi'

import { shortenAddress } from '@/utils/formatters'

const ConnectButton = ({ className }: { className?: string }) => {
  const { open } = useWeb3Modal()
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <Button
      onClick={isConnected ? () => disconnect() : () => open()}
      className={`bg-darkness py-[2vh] px-[4vw] w-full flex justify-center text-white  hover:scale-105  hover:text-carmesi ${className}`}
    >
      {isConnected ? (
        <p className="text-[.8vw]"> Disconnect {shortenAddress(address)}</p>
      ) : (
        <p className="text-[1vw]">Connect Wallet</p>
      )}
    </Button>
  )
}

export default ConnectButton

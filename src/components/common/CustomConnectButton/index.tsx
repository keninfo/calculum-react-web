// Adjust import according to your project structure
import { ConnectButton } from '@rainbow-me/rainbowkit'

const CustomConnectButton = ({ className }: { className?: string }) => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openConnectModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated')

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
                width: 'full',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className={`flex w-full justify-center rounded-lg bg-carmesi py-4 text-white hover:scale-105 hover:text-smoke`}
                  >
                    <p className="text-[2vh] md:text-[1vw]">Connect Wallet</p>
                  </button>
                )
              }
              return (
                <button
                  onClick={openAccountModal}
                  className={`flex w-full justify-center rounded-lg border-2 border-[#4D70C2] bg-transparent px-4 py-2 text-[#4D70C2] hover:scale-105 hover:text-white ${className}`}
                >
                  {account.displayName}
                </button>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default CustomConnectButton

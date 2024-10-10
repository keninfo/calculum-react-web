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
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <div className="flex items-center justify-end space-x-[2vw]">
                    <div className="| hidden items-center space-x-2 px-[2vw] py-[2vh] text-sm text-white md:flex">
                      <div className="h-3 w-3 animate-pulse rounded-full bg-carmesi"></div>
                      <p>TESTNET</p>
                    </div>
                    <button
                      onClick={openConnectModal}
                      className={`flex w-fit justify-center rounded-lg bg-carmesi px-[2vw] py-[2vh] text-white hover:scale-105 hover:text-smoke`}
                    >
                      <p className="text-[2vh] md:text-[1vw]">Connect Wallet</p>
                    </button>
                  </div>
                )
              }
              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <div className="flex items-center space-x-2 px-[2vw] py-[2vh] text-sm text-white">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-carmesi"></div>
                    <p>TESTNET</p>
                  </div>
                  <button
                    onClick={openAccountModal}
                    className={`flex justify-center rounded-lg bg-carmesi px-[4vw] py-[2vh] text-white hover:scale-105 hover:text-smoke ${className}`}
                  >
                    {account.displayName}
                  </button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default CustomConnectButton

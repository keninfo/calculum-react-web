// Adjust import according to your project structure
import { ConnectButton } from '@rainbow-me/rainbowkit'

const CustomConnectButton = ({ className }: { className?: string }) => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
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
                  <button
                    onClick={openConnectModal}
                    className={`bg-carmesi py-[2vh] px-[4vw] w-fit flex justify-center text-white hover:scale-105 hover:text-smoke`}
                  >
                    <p className="text-[2vh] md:text-[1vw]">Connect Wallet</p>
                  </button>
                )
              }
              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    className="flex items-center bg-none py-[1vh] px-[1vw]  justify-center hover:scale-105 bg-opacity-0"
                  >
                    {chain.iconUrl && (
                      <img alt={chain.name ?? 'Chain icon'} src={chain.iconUrl} style={{ width: 30, height: 30 }} />
                    )}
                  </button>
                  <button
                    onClick={openAccountModal}
                    className={`bg-carmesi py-[2vh] px-[4vw] flex justify-center text-white hover:scale-105 hover:text-smoke ${className}`}
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

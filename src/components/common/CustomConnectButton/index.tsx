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
                  <div className='flex justify-end items-center space-x-[2vw]'>
                    <div className='py-[2vh] px-[2vw] text-sm text-white flex items-center space-x-2'>
                      <div className='h-3 w-3 rounded-full bg-carmesi animate-pulse'></div>
                      <p>TESTNET</p>
                    </div>
                    <button
                      onClick={openConnectModal}
                      className={`bg-carmesi py-[2vh] px-[2vw] w-fit flex justify-center text-white rounded-lg hover:scale-105 hover:text-smoke`}
                    >
                      <p className="text-[2vh] md:text-[1vw]">Connect Wallet</p>
                    </button>
                  </div>
                )
              }
              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <div className='py-[2vh] px-[2vw] text-sm text-white flex items-center space-x-2'>
                    <div className='h-3 w-3 rounded-full bg-carmesi animate-pulse'></div>
                    <p>TESTNET</p>
                  </div>
                  <button
                    onClick={openAccountModal}
                    className={`bg-carmesi py-[2vh] px-[4vw] flex justify-center text-white rounded-lg hover:scale-105 hover:text-smoke ${className}`}
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

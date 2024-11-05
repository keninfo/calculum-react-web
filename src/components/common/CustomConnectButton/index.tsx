import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
                    className={`flex w-full justify-center rounded-lg bg-primary py-4 text-offWhite hover:scale-105 hover:text-eerie`}
                  >
                    <p className="text-[2vh] md:text-[1vw]">Connect Wallet</p>
                  </button>
                )
              }
              return (
                <button
                  onClick={openAccountModal}
                  className={`flex w-full items-center justify-between rounded-lg border-2 border-true bg-transparent px-4 py-2 text-true hover:scale-105 hover:text-offWhite ${className}`}
                >
                  <div className="h-4 w-4 bg-transparent"></div>
                  {account.displayName}
                  <FontAwesomeIcon icon={['fas', 'arrow-right-from-bracket' as IconName]} className="h-4" />
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

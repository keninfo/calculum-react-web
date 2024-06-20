// Adjust import according to your project structure
import { library } from '@fortawesome/fontawesome-svg-core'
import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ConnectButton } from '@rainbow-me/rainbowkit'

library.add(fas)

const SmallCustomConnectButton = ({ className }: { className?: string }) => {
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
                  <button
                    onClick={openConnectModal}
                    className={`py-[2vh] px-[4vw] w-full flex justify-center text-white hover:scale-105 hover:text-smoke`}
                  >
                    <p className="text-white flex items-center">
                      <FontAwesomeIcon icon={['fas', 'wallet' as IconName]} className="h-[4vh]" />
                    </p>
                  </button>
                )
              }
              return (
                <button
                  onClick={openAccountModal}
                  className={`bg-carmesi py-[2vh] px-[4vw] flex justify-center text-white hover:scale-105 hover:text-smoke ${className}`}
                >
                  <p className="text-white flex items-center">
                    <FontAwesomeIcon icon={['fas', 'wallet' as IconName]} className="h-[4vh]" />
                  </p>
                </button>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default SmallCustomConnectButton

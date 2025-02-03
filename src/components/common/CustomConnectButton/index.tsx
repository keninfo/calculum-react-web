import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ConnectButton } from '@rainbow-me/rainbowkit'

/** * Properties for the `CustomConnectButton` component. */
type CustomConnectButtonProps = {
  /** * Optional CSS class for custom styling of the button. */
  className?: string
}

/**
 * A custom connect button for RainbowKit that handles wallet connection and account modal opening.
 *
 * @remarks
 * If the wallet is not connected, the button will prompt the user to connect. Once connected, it will display the account information
 * and allow the user to open the account modal.
 *
 * @param className - Optional CSS class to customize the button's styling.
 * @returns A button component that manages wallet connection and account viewing.
 */
const CustomConnectButton = ({ className }: CustomConnectButtonProps) => {
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
                    className={`flex w-fit justify-center rounded-md bg-primary px-4 py-1 text-eerie hover:scale-105 hover:text-eerie md:py-2`}
                  >
                    <p>Connect Wallet</p>
                  </button>
                )
              }
              return (
                <button
                  onClick={openAccountModal}
                  className={`flex w-fit items-center justify-between rounded-lg border-2 border-robin bg-transparent px-4 py-1 text-robin hover:text-offWhite md:py-2 ${className}`}
                >
                  <div className="h-4 w-4 bg-transparent"></div>
                  {account.displayName}
                  <FontAwesomeIcon icon={['fas', 'arrow-right-from-bracket' as IconName]} className="ml-4 h-4" />
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

import type { ActionType } from '@bandit-network/react'
import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useEffect } from 'react'

import Image from 'next/image'

import { useAccount } from 'wagmi'

export const Action = ({
  action,
  openApp,
  onComplete,
}: {
  action: ActionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openApp: any
  onComplete: () => void
}) => {
  const { status, claimablePoints, name, id, app } = action
  const { isConnected } = useAccount()

  useEffect(() => {
    if (status?.isCompleted) {
      onComplete()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  if (!isConnected) {
    return (
      <div className={`${!status?.isCompleted ? 'border-offWhite' : 'border-grey'} rounded-xl border px-5 py-2`}>
        {name?.includes('X') && (
          <Image src="/x.png" width={50} height={100} alt="image" className="mx-auto mb-2 mt-1 h-5 w-5" />
        )}
        <h1
          className={`${!status?.isCompleted ? 'text-primary' : 'text-grey'} flex justify-center space-x-4 text-center`}
        >
          {name?.includes('X') ? name?.split(' ')[1] : name}
        </h1>
      </div>
    )
  }

  return (
    <div
      className={`${!status?.isCompleted ? 'cursor-pointer border-offWhite hover:scale-105' : 'border-grey'} w-full rounded-xl border px-5 py-2`}
      onClick={() => {
        !status?.isCompleted && openApp(id, app)
      }}
    >
      {name?.includes('X') && (
        <Image src="/x.png" width={50} height={100} alt="image" className="mx-auto mb-2 mt-1 h-5 w-5" />
      )}
      <h1
        className={`${!status?.isCompleted ? 'text-primary' : 'text-grey'} flex justify-center space-x-4 text-center`}
      >
        {name?.includes('X') ? name?.split(' ')[1] : name}
      </h1>
      {claimablePoints && (
        <div
          className={`flex justify-center text-center ${status?.isCompleted ? 'text-grey line-through' : 'text-robin'}`}
        >
          {claimablePoints} MT
          {status?.isCompleted && (
            <p className="ml-2 text-center text-robin">
              <FontAwesomeIcon icon={['fas', 'square-check' as IconName]} />
            </p>
          )}
        </div>
      )}
    </div>
  )
}

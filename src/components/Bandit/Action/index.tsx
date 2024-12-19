import type { ActionType } from '@bandit-network/react'
import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Action = ({ action, openApp }: { action: ActionType; openApp: any }) => {
  const { status, claimablePoints, name, description, id, app } = action

  console.log(description)
  return (
    <div
      className={`${!status?.isCompleted ? 'cursor-pointer border-offWhite hover:scale-105' : 'border-grey'} rounded-xl border px-5 py-2`}
      onClick={() => {
        !status?.isCompleted && openApp(id, app)
      }}
    >
      <h1
        className={`${!status?.isCompleted ? 'text-primary' : 'text-grey'} flex justify-center space-x-4 text-center`}
      >
        {name}
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

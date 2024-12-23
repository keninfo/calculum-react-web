import type { ActionType } from '@bandit-network/react'

import { Action } from '../Action'

export const Segment = ({
  actions,
  openApp,
  onActionComplete,
}: {
  actions: Array<ActionType>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openApp: any
  onActionComplete: () => void // Callback for action completion
}) => {
  return (
    <div className="justify-start space-y-4 md:flex md:space-x-4 md:space-y-0">
      {actions.map((action: ActionType) => (
        <Action
          key={action.id}
          action={action}
          openApp={openApp}
          onComplete={onActionComplete} // Pass the callback to Action
        />
      ))}
    </div>
  )
}

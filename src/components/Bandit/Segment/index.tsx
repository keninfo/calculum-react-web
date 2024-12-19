import type { ActionType } from '@bandit-network/react'

import { Action } from '../Action'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Segment = ({ actions, openApp }: { actions: Array<ActionType>; openApp: any }) => {
  return (
    <div className="justify-start space-y-4 md:flex md:space-x-4 md:space-y-0">
      {actions.map((action: ActionType) => (
        <Action key={action.id} action={action} openApp={openApp} />
      ))}
    </div>
  )
}

import React from 'react'

/** * Properties for the `ActionAlert` component. */
type AlertProps = {
  /** * The message to display in the alert. */
  alert: string

  /** * Additional CSS classes for styling the alert.
   * @defaultValue `''`*/
  className?: string

  /** * An optional callback triggered when the alert is clicked. */
  closeAction?: () => void
}

/**
 * A reusable alert component that displays a message with optional styles and a close action.
 *
 * @remarks
 * The component renders a dismissible alert if the `closeAction` prop is provided.
 *
 * @param alert - The message to display in the alert.
 * @param className - Additional CSS classes for styling the alert.
 * @defaultValue `''`
 * @param closeAction - An optional callback triggered when the alert is clicked.
 * @returns The rendered alert component.
 */

const ActionAlert: React.FC<AlertProps> = ({ alert, className = '', closeAction }) => (
  <div
    className={`py-2 text-dark ${className} w-full bg-citron text-center text-xs ${
      closeAction ? '!cursor-pointer' : ''
    } flex items-center justify-between px-4`}
    onClick={closeAction}
  >
    <p> </p>
    <p>{alert}</p>
    <p>{closeAction ? 'x' : ''}</p>
  </div>
)

export default ActionAlert

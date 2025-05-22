import type { ReactNode } from 'react'

/** * Properties for the button components. */
type ButtonProps = {
  /** * Function to handle the button click event. */
  handleClick: () => void

  /** * The content to be displayed inside the button. */
  children: ReactNode

  /** * Flag to disable the button. */
  disabled?: boolean

  /** * Additional CSS class for custom styling. */
  className?: string

  /** * Flag to indicate if the button should have a border. */
  border?: boolean
}

/**
 * A primary button with a customizable click event and styling.
 *
 * @remarks
 * This button is used for the primary actions with customizable borders, text color, and hover effect.
 *
 * @param handleClick - Function to handle the button click event.
 * @param children - The content displayed inside the button.
 * @param disabled - Optional flag to disable the button.
 * @param border - Optional flag to add a border around the button.
 * @param className - Optional additional CSS class for custom styling.
 * @returns A styled primary button component.
 */
export const PrimaryButton = ({ handleClick, children, disabled, border, className }: ButtonProps) => (
  <button
    onClick={handleClick}
    className={`flex w-[100%] justify-center rounded-lg py-2 text-eerie hover:opacity-80 ${border ? 'border-2' : ''} ${disabled ? 'bg-grey' : 'bg-primary'} ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
)

/**
 * A secondary button with customizable click event and styling.
 *
 * @remarks
 * This button is used for secondary actions, with customizable borders, text color, and hover effect.
 *
 * @param handleClick - Function to handle the button click event.
 * @param children - The content displayed inside the button.
 * @param disabled - Optional flag to disable the button.
 * @param border - Optional flag to add a border around the button.
 * @param className - Optional additional CSS class for custom styling.
 * @returns A styled secondary button component.
 */
export const SecondaryButton = ({ handleClick, children, disabled, border, className }: ButtonProps) => (
  <button
    onClick={handleClick}
    className={`flex w-[100%] justify-center bg-dark py-1 text-offWhite ${border ? 'border-2' : ''} ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
)

/**
 * A button for maximum actions with customizable click event and styling.
 *
 * @remarks
 * This button is typically used for "max" actions, such as "Max" input values.
 *
 * @param handleClick - Function to handle the button click event.
 * @param children - The content displayed inside the button.
 * @param disabled - Optional flag to disable the button.
 * @param border - Optional flag to add a border around the button.
 * @param className - Optional additional CSS class for custom styling.
 * @returns A styled max button component.
 */
export const MaxButton = ({ handleClick, children, disabled, border, className }: ButtonProps) => (
  <button
    onClick={handleClick}
    className={`flex items-center justify-center rounded-lg bg-anti px-2 py-1 text-xs text-eerie hover:bg-white ${border ? 'border-2' : ''} ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
)

/**
 * An alternate button with customizable click event and styling.
 *
 * @remarks
 * This button is an alternate style with a border and hover effect for secondary actions.
 *
 * @param handleClick - Function to handle the button click event.
 * @param children - The content displayed inside the button.
 * @param disabled - Optional flag to disable the button.
 * @param border - Optional flag to add a border around the button.
 * @param className - Optional additional CSS class for custom styling.
 * @returns A styled alternate button component.
 */
export const AlternateButton = ({ handleClick, children, disabled, border, className }: ButtonProps) => (
  <button
    onClick={handleClick}
    className={`flex items-center justify-center rounded-lg border-2 border-offWhite px-2 py-2 text-offWhite hover:bg-offWhite hover:text-eerie ${border ? 'border-2' : ''} ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
)

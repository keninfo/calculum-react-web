import React from 'react'

/** * Properties for the `Input` component. */
type InputProps = {
  /** * Optional change handler for the input. */
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void

  /** * The value of the input field. */
  value: string | number

  /** * Optional CSS class for custom styling of the input. */
  className?: string

  /** * Optional flag to disable the input field. */
  disabled?: boolean

  /** * Optional input type, either 'number' or 'text'. */
  type?: 'number' | 'text'

  /** * Optional placeholder for the input field. */
  placeholder?: string
}

/**
 * A reusable input component that can be used for text or number inputs.
 *
 * @remarks
 * This component renders a styled input field, with customizable features like `disabled` state, `type`, and `placeholder`.
 *
 * @param handleChange - An optional change handler for the input field.
 * @param value - The value of the input field.
 * @param className - Optional CSS class for styling the input field.
 * @param disabled - A flag that disables the input if set to `true`.
 * @param type - The input type, either 'number' or 'text' (defaults to 'text').
 * @param placeholder - The placeholder text for the input field.
 * @returns The styled input field component.
 */
const Input = ({
  handleChange,
  value,
  className = '',
  disabled = false,
  type = 'text',
  placeholder = '..',
}: InputProps) => {
  return (
    <input
      className={`w-full border-b-2 border-payne bg-transparent py-1 text-center text-offWhite ${className}`}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={handleChange}
      disabled={disabled}
    />
  )
}

export default Input

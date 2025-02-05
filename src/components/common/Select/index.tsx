import React from 'react'

import { ChevronBlack, Chevron } from '@/components/common/Icons/Chevron'

/** * Properties for the `Select` component. */
type SelectProps = {
  /** * Callback function to handle selection change. */
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void

  /** * The current selected value of the select input. */
  value: string | number

  /** * List of options to be displayed in the select dropdown. */
  options: (string | number)[]

  /** * Optional className for custom styling. */
  className?: string

  /** * Flag to disable the select input. */
  disabled?: boolean

  /** * Flag to determine the icon style (light or default). */
  light?: boolean
}

/**
 * A select dropdown component with custom icon.
 *
 * @remarks
 * The component renders a select input with a list of options and a chevron icon.
 * The icon style can be customized via the `light` prop.
 *
 * @param handleChange - Callback function to handle value changes.
 * @param value - The current selected value.
 * @param options - List of options to be displayed.
 * @param className - Optional class for custom styling.
 * @param disabled - Flag to disable the select input.
 * @param light - Flag to use a light icon style.
 * @returns The select dropdown with an icon.
 */
const Select = ({ handleChange, value, options, className = '', disabled = false, light = false }: SelectProps) => {
  return (
    <div className="relative w-fit">
      <select
        className={`text-md h-fit w-full cursor-pointer bg-transparent py-1 text-left md:w-max ${disabled ? 'pr-0' : 'pr-8 text-offWhite'} ${className}`}
        id="cryptoCoin"
        onChange={handleChange}
        value={value}
        disabled={disabled}
      >
        {options.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
      {!disabled && (
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 md:translate-x-1/2">
          {light ? <ChevronBlack /> : <Chevron />}
        </div>
      )}
    </div>
  )
}

export default Select

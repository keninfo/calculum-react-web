import React from 'react'

import Chevron from '@/components/common/Icons/Chevron'

type SelectProps = {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void // now required
  value: string | number
  options: string[] | number[]
  className?: string
  disabled?: boolean
}

const Select = ({ handleChange, value, options, className = '', disabled = false }: SelectProps) => {
  return (
    <div className="relative w-fit">
      <select
        className={`text-md h-fit w-full cursor-pointer bg-transparent py-1 text-left text-offWhite md:w-max ${disabled ? 'pr-0' : 'pr-8 !text-citron'} ${className}`}
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
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
          <Chevron />
        </div>
      )}
    </div>
  )
}

export default Select

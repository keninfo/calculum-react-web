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
        className={`border-graySmoke h-fit w-full cursor-pointer border-b-2 border-grey bg-transparent py-1 pr-10 text-left text-sm text-offWhite md:w-max ${className}`}
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
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
        <Chevron />
      </div>
    </div>
  )
}

export default Select

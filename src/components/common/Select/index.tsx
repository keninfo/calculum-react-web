import React from 'react'

import Chevron from '@/components/common/Icons/Chevron'

type SelectProps = {
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  value: string | number
  options: string[] | number[]
  className?: string
  disabled?: boolean
}

const Select = ({ handleChange, value, options, className = '', disabled = false }: SelectProps) => {
  return (
    <div className="relative">
      <select
        className={`| h-fit w-full cursor-pointer rounded-md border border-white bg-smoke py-0.5 pl-[2vw] pr-[2vw] text-left text-sm text-white md:w-max md:pl-[.5vw] md:pr-[2vw] ${className}`}
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
      <div className="| pointer-events-none absolute right-[2vw] top-1/2 -translate-y-1/2 md:right-[.5vw]">
        <Chevron />
      </div>
    </div>
  )
}

export default Select

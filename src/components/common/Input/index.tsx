import React from 'react'

type InputProps = {
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string | number
  className?: string
  disabled?: boolean
  type?: 'number' | 'text'
  placeholder?: string
}

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
      className={`| w-full rounded-md border-2 border-white bg-darkness px-[4vw] py-[1vh] text-white md:px-[1vw] ${className}`}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={handleChange}
      disabled={disabled}
    />
  )
}

export default Input

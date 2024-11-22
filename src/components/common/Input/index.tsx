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

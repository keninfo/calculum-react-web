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
      className={`bg-darkness text-white border-2 border-white py-[1vh] w-full px-[4vw] rounded-lg | md:px-[1vw] ${className}`}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={handleChange}
      disabled={disabled}
    />
  )
}

export default Input

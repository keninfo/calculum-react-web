import type { ReactNode } from 'react'

type ButtonProps = {
  handleClick: () => void
  children: ReactNode
  disabled?: boolean
  className?: string
  border?: boolean
}

export const PrimaryButton = ({ handleClick, children, disabled, border, className }: ButtonProps) => (
  <button
    onClick={handleClick}
    className={`bg-smoke py-6 flex justify-center text-white  hover:scale-110 w-[100%] rounded-lg hover:text-carmesi ${border ? 'border-2' : ''} ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
)

export const SecondaryButton = ({ handleClick, children, disabled, border, className }: ButtonProps) => (
  <button
    onClick={handleClick}
    className={`bg-darkness py-6 flex justify-center text-white  hover:scale-110 w-[100%] rounded-lg  hover:text-carmesi ${border ? 'border-2' : ''} ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
)

export const AlternateButton = ({ handleClick, children, disabled, border, className }: ButtonProps) => (
  <button
    onClick={handleClick}
    className={`bg-carmesi px-[2vw] py-[1vh] flex justify-center items-center text-white rounded-lg   ${border ? 'border-2 border-white' : ''} ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
)

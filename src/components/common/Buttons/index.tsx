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
    className={`flex w-[100%] justify-center rounded-lg bg-carmesi py-6 text-white hover:scale-110 hover:text-smoke ${border ? 'border-2' : ''} ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
)

export const SecondaryButton = ({ handleClick, children, disabled, border, className }: ButtonProps) => (
  <button
    onClick={handleClick}
    className={`flex w-[100%] justify-center rounded-lg bg-darkness py-6 text-white hover:scale-110 hover:text-carmesi ${border ? 'border-2' : ''} ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
)

export const AlternateButton = ({ handleClick, children, disabled, border, className }: ButtonProps) => (
  <button
    onClick={handleClick}
    className={`flex items-center justify-center rounded-lg bg-smoke px-[2vw] py-[1vh] text-white hover:text-carmesi ${border ? 'border-2 border-white' : ''} ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
)

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
    className={`flex w-[100%] justify-center rounded-lg bg-primary py-2 text-eerie hover:bg-primary ${border ? 'border-2' : ''} ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
)

export const SecondaryButton = ({ handleClick, children, disabled, border, className }: ButtonProps) => (
  <button
    onClick={handleClick}
    className={`flex w-[100%] justify-center rounded-lg bg-dark py-6 text-offWhite hover:scale-110 hover:text-primary ${border ? 'border-2' : ''} ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
)

export const AlternateButton = ({ handleClick, children, disabled, border, className }: ButtonProps) => (
  <button
    onClick={handleClick}
    className={`flex items-center justify-center rounded-lg bg-anti px-2 py-1 text-xs text-eerie ${border ? 'border-2' : ''} ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
)

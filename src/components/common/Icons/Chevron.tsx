import React from 'react'

interface ChevronIconProps {
  fill?: string
  stroke?: string
}

export const Chevron: React.FC<ChevronIconProps> = () => {
  return (
    <svg
      fill="current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="current"
      width="25"
      height="25"
      className="rounded-md bg-primary fill-none stroke-dark"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export const ChevronBlack: React.FC<ChevronIconProps> = () => {
  return (
    <svg
      fill="current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="current"
      width="14"
      height="14"
      className="fill-none stroke-dark"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export default Chevron

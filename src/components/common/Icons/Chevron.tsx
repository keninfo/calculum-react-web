import React from 'react'

interface ChevronIconProps {
  fill?: string
  stroke?: string
}

const Chevron: React.FC<ChevronIconProps> = ({ fill = 'none', stroke = 'white' }) => {
  return (
    <svg fill={fill} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke={stroke} width="24" height="24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export default Chevron

import type { ReactNode } from 'react'
import React from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}

const Card = ({ children, className }: CardProps) => {
  return <div className={`h-fit w-fit bg-darkness rounded-3xl p-[5vh] ${className}`}>{children}</div>
}

export default Card

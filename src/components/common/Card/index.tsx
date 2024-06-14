import type { ReactNode } from 'react'
import React from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}

const Card = ({ children, className }: CardProps) => {
  return <div className={`h-fit w-fit p-[5vh] transition ease-in-out bg-darkness  ${className}`}>{children}</div>
}

export default Card

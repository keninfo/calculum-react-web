import type { ReactNode } from 'react'
import React from 'react'

const Card = ({ children }: { children: ReactNode }) => {
  return <div className="h-fit w-full bg-darkness rounded-[50px] p-10 shadow-2xl">{children}</div>
}

export default Card

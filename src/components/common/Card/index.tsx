import type { ReactNode } from 'react'
import React from 'react'

const Card = ({ children }: { children: ReactNode }) => {
  return <div className="h-fit w-fit bg-darkness rounded-[50px] p-[5vh] ">{children}</div>
}

export default Card

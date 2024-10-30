import { useAutoAnimate } from '@formkit/auto-animate/react'

import type { ReactNode } from 'react'
import React from 'react'

type CardProps = {
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
}

const Card = ({ title, subtitle, children, className }: CardProps) => {
  const [parent] = useAutoAnimate()
  return (
    <div className={`h-fit w-fit rounded-lg bg-darkness p-5 transition ease-in-out md:p-6 ${className}`} ref={parent}>
      {(title || subtitle) && (
        <div className="mb-[2vh] flex h-fit items-center justify-between pb-2 font-bold">
          <h4 className="w-full text-center text-xl">{title}</h4>
          <p className="text-md">{subtitle}</p>
        </div>
      )}
      {children}
    </div>
  )
}

export default Card

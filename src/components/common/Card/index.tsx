'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import type { ReactNode } from 'react'
import React from 'react'

/** * Properties for the `Card` component. */
type CardProps = {
  /** * Optional title of the card. */
  title?: string
  /** * Optional subtitle of the card. */
  subtitle?: string
  /** * The content inside the card. */
  children: ReactNode
  /** * Optional additional CSS classes for styling. */
  className?: string
}

/**
 * A card component that displays a title, subtitle, and children content with optional styles.
 *
 * @remarks
 * The card is flexible and can display a title and subtitle, as well as customizable content.
 *
 * @param title - Optional title for the card.
 * @param subtitle - Optional subtitle for the card.
 * @param children - The content displayed inside the card.
 * @param className - Optional CSS class for custom styling.
 * @returns The `Card` component with customizable content.
 */
const Card = ({ title, subtitle, children, className }: CardProps) => {
  const [parent] = useAutoAnimate()
  return (
    <div className={`h-fit w-fit rounded-lg bg-dark p-5 transition ease-in-out md:p-6 ${className}`} ref={parent}>
      {(title || subtitle) && (
        <div className="mb-[2vh] flex h-fit items-center justify-between pb-2">
          <h4 className="w-full text-center text-2xl md:text-left">{title}</h4>
          <p className="text-md">{subtitle}</p>
        </div>
      )}
      {children}
    </div>
  )
}

export default Card

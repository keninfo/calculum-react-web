'use client'

import React from 'react'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

import { PrimaryButton } from '@/components/common/Buttons'

const NotFoundPage = () => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center text-offWhite">
      <div className="absolute left-0 top-0 -z-10 flex h-full w-full -translate-y-20 items-center justify-start opacity-80">
        <Image
          src={'/bear.png'}
          width={4000}
          height={4000}
          alt="background picture of blueprints"
          priority
          className="h-1/4 w-auto translate-x-full"
        />
      </div>
      <h1 className="text-6xl font-bold text-citron">404</h1>
      <h2 className="mt-2 text-2xl font-semibold">`{pathname.toUpperCase().slice(1)}` NOT FOUND</h2>
      <p className="mt-4 text-lg text-gray-400">The page you are looking for doesn’t exist or has been moved.</p>
      <PrimaryButton
        className="mt-6 w-1/4 rounded-lg bg-primary px-6 py-2 text-dark hover:bg-robin"
        handleClick={() => router.push('/')}
      >
        Go Home
      </PrimaryButton>
    </div>
  )
}

export default NotFoundPage

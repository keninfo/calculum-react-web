'use client'

import React, { useState } from 'react'

import Input from '@/components/common/Input'

import FetchTest from './fetchTest'

export default function Home() {
  const [name, setName] = useState<string>('BTC')

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  return (
    <>
      <Input
        placeholder="Name..."
        type="text"
        value={name}
        handleChange={handleNameChange}
        className="border-none text-2xl"
      />
      <FetchTest token={name} />
    </>
  )
}

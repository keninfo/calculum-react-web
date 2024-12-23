import React, { useEffect } from 'react'

import { PrimaryButton } from '@/components/common/Buttons'
import ToggleSwitch from '@/components/common/ToggleSwitch'
import { useProStore } from '@/store/useProStore'

const ProToggle = () => {
  const { pro, setPro } = useProStore()

  useEffect(() => {
    if (pro) {
      document.body.classList.add('pro')
      document.body.classList.remove('classic')
    } else {
      document.body.classList.add('classic')
      document.body.classList.remove('pro')
    }
  }, [pro])

  return (
    <PrimaryButton
      handleClick={() => setPro(!pro)}
      className="flex w-fit items-center justify-start text-offWhite hover:text-offWhite md:bg-dark md:px-4 md:py-[1vh]"
    >
      <ToggleSwitch />
    </PrimaryButton>
  )
}

export default ProToggle

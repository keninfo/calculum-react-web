import React, { useEffect } from 'react'

import { PrimaryButton } from '@/components/common/Buttons'
import BearAttack from '@/components/common/Icons/BearAttack'
import BearPassive from '@/components/common/Icons/BearPassive'
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
      className="| flex !w-fit items-center justify-end text-offWhite hover:text-offWhite md:bg-dark md:py-[1vh] md:pl-2"
    >
      {!pro ? (
        <div className="flex items-center justify-between space-x-2">
          <ToggleSwitch />
          <BearPassive className="h-[3vh] -scale-x-100" />
        </div>
      ) : (
        <div className="flex items-center justify-between space-x-2">
          <ToggleSwitch />
          <BearAttack className="h-[3vh] -scale-x-100" />
        </div>
      )}
    </PrimaryButton>
  )
}

export default ProToggle

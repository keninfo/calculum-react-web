import React, { useContext, useEffect } from 'react'

import { PrimaryButton } from '@/components/common/Buttons'
import BearAttack from '@/components/common/Icons/BearAttack'
import BearPassive from '@/components/common/Icons/BearPassive'
import ToggleSwitch from '@/components/common/ToggleSwitch'
import { ProContext } from '@/contexts/ProContext'

const ProToggle = () => {
  const { pro, setPro } = useContext(ProContext)

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
      className="| flex !w-fit items-center justify-end text-white hover:text-white md:bg-darkness md:py-[1vh] md:pl-[2vw]"
    >
      {!pro ? (
        <div className="flex items-center justify-between space-x-5">
          <ToggleSwitch />
          <BearPassive className="h-[5vh] -scale-x-100" />
        </div>
      ) : (
        <div className="flex items-center justify-between space-x-5">
          <ToggleSwitch />
          <BearAttack className="h-[5vh] -scale-x-100" />
        </div>
      )}
    </PrimaryButton>
  )
}

export default ProToggle

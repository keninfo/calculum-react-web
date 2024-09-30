import React, { useContext, useEffect } from 'react'

import { ProContext } from '../AppProviders'
import { PrimaryButton } from '../common/Buttons'
import BearAttack from '../common/Icons/BearAttack'
import BearPassive from '../common/Icons/BearPassive'
import ToggleSwitch from '../common/ToggleSwitch'

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
      className="!w-fit flex justify-end items-center text-white | md:bg-darkness md:py-[1vh] md:pl-[2vw] hover:text-white"
    >
      {!pro ? (
        <div className="flex justify-between items-center space-x-5">
          <ToggleSwitch />
          <BearPassive className="h-[5vh] -scale-x-100" />
        </div>
      ) : (
        <div className="flex justify-between items-center space-x-5">
          <ToggleSwitch />
          <BearAttack className="h-[5vh] -scale-x-100" />
        </div>
      )}
    </PrimaryButton>
  )
}

export default ProToggle

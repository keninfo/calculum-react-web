import React, { useContext, useEffect } from 'react'

import { ProContext } from '../AppProviders'
import BearAttack from '../common/Icons/BearAttack'
import BearPassive from '../common/Icons/BearPassive'

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
    <button
      onClick={() => setPro(!pro)}
      className="w-fit flex justify-end items-center text-white hover:scale-105 group md:bg-darkness md:py-[1vh] md:pl-[2vw]"
    >
      {!pro ? (
        <div className="flex justify-between items-center space-x-5">
          <p className="hidden font-bold | md:block">CLASSIC</p>
          <BearPassive className="h-[5vh] -scale-x-100" />
        </div>
      ) : (
        <div className="flex justify-between items-center space-x-5">
          <p className="hidden font-bold text-carmesi | md:block">PRO</p>
          <BearAttack className="h-[5vh] -scale-x-100" />
        </div>
      )}
    </button>
  )
}

export default ProToggle

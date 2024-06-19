import React, { useContext } from 'react'

import { ProContext } from '../AppProviders'

const ProToggle = () => {
  const { pro, setPro } = useContext(ProContext)

  return (
    <button
      onClick={() => {
        setPro(!pro)
      }}
      className="relative flex justify-center items-center text-white hover:scale-105 group md:bg-darkness md:py-[1vh] md:pl-[2vw]"
    >
      {!pro ? (
        <div className="flex justify-between items-center space-x-5 w-max">
          <p className="hidden font-bold | md:block">CLASSIC</p>
          <img src="/bearPassive.svg" alt="Bear Protocol" className="h-[5vh] -scale-x-100" />
        </div>
      ) : (
        <div className="flex justify-between items-center space-x-5 w-max">
          <p className="hidden font-bold text-carmesi | md:block">PRO</p>
          <img src="/bearAttack.svg" alt="Bear Protocol" className="h-[5vh] -scale-x-100" />
        </div>
      )}
    </button>
  )
}

export default ProToggle

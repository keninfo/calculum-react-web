import React, { useState } from 'react'

const TradesTable = () => {
  const [selected, setSelected] = useState<number>(0)
  return (
    <div className="w-full h-max">
      <div className="flex justify-between pl-[5vh] items-start">
        <h1 className="text-2xl text-center ">TRADES</h1>
        <div className="flex justify-between items-center space-x-[2vw]">
          <div
            className={`text-center border-2  bg-smoke rounded-lg px-[2vw] py-[1vh] cursor-pointer  hover:scale-105 ${selected == 0 ? 'border-white' : 'border-smoke'}`}
            onClick={() => setSelected(0)}
          >
            <h4>Open</h4>
          </div>
          <div
            className={`text-center border-2  bg-smoke rounded-lg px-[2vw] py-[1vh] cursor-pointer  hover:scale-105 ${selected == 1 ? 'border-white' : 'border-smoke'}`}
            onClick={() => setSelected(1)}
          >
            <h4>Closed</h4>
          </div>
        </div>
      </div>
      <p className="text-center mt-[10vh] text-2xl">
        {selected == 0 && `You currently have no open trades`}
        {selected == 1 && `You currently have no closed trades`}
      </p>
    </div>
  )
}

export default TradesTable

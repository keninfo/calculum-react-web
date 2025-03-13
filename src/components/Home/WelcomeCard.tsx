import React, { useState } from 'react'

import Card from '../common/Card'

export const WelcomeCard = () => {
  const [closed, setClosed] = useState<boolean>(false)

  // useEffect(() => {
  //   const storedBool = localStorage.getItem('closedWelcome')
  //   if (storedBool !== null) {
  //     setClosed(JSON.parse(storedBool))
  //   }
  // }, [])

  const handleClose = () => {
    setClosed(true)
    // localStorage.setItem('closedWelcome', JSON.stringify(true))
  }

  if (closed) {
    return
  }

  return (
    <Card className="relative mb-4 flex w-full items-start justify-between">
      <p className="absolute right-4 top-2 cursor-pointer hover:text-primary" onClick={() => handleClose()}>
        x
      </p>
      <div className="w-1/4">
        <h1 className="text-xl">HOW IT WORKS</h1>
      </div>
      <div className="flex justify-end space-x-6">
        <div className="col-span-1 flex flex-col items-start justify-start">
          <p className="text-primary">Step 1</p>
          <p className="text-left text-xs text-offWhite">Select any of your blue-chip tokens.</p>
        </div>
        <div className="col-span-1 flex flex-col items-start justify-start">
          <p className="text-primary">Step 2</p>
          <p className="text-left text-xs text-offWhite">Choose any of our award-winning strategies.</p>
        </div>
        <div className="col-span-1 flex flex-col items-start justify-start">
          <p className="text-primary">Step 3</p>
          <p className="text-left text-xs text-offWhite">Allocate an amount to the strategy.</p>
        </div>
        <div className="col-span-1 flex flex-col items-start justify-start">
          <p className="text-primary">Step 4</p>
          <p className="text-left text-xs text-offWhite">Let our algos protect and multiply your wealth.</p>
        </div>
      </div>
    </Card>
  )
}

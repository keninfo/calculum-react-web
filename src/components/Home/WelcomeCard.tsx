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
    <Card className="relative mb-4 w-full items-start justify-between md:flex">
      <p className="absolute right-4 top-2 cursor-pointer hover:text-primary" onClick={() => handleClose()}>
        x
      </p>
      <div className="mb-4 text-center md:mb-0 md:w-1/4 md:text-left">
        <h1 className="text-xl">HOW IT WORKS</h1>
      </div>
      <div className="justify-end text-center md:flex md:space-x-6 md:text-left">
        <div className="col-span-1 flex-col items-start justify-start md:flex">
          <p className="text-primary">Step 1</p>
          <p className="text-xs text-offWhite md:text-left">Select any of your blue-chip tokens.</p>
        </div>
        <div className="col-span-1 flex-col items-start justify-start md:flex">
          <p className="text-primary">Step 2</p>
          <p className="text-xs text-offWhite md:text-left">Choose any of our award-winning strategies.</p>
        </div>
        <div className="col-span-1 flex-col items-start justify-start md:flex">
          <p className="text-primary">Step 3</p>
          <p className="text-xs text-offWhite md:text-left">Allocate an amount to the strategy.</p>
        </div>
        <div className="col-span-1 flex-col items-start justify-start md:flex">
          <p className="text-primary">Step 4</p>
          <p className="text-xs text-offWhite md:text-left">Let our algos protect and multiply your wealth.</p>
        </div>
      </div>
    </Card>
  )
}

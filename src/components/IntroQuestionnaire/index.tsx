import { useState } from 'react'

import Link from 'next/link'

import ContractReads from '@/hooks/useContractReads'

import { PrimaryButton } from '../common/Buttons'
import Card from '../common/Card'

const options = [
  `Cool branding, i'm just curious about what $bear is.`,
  `I want to control my portfolio's volatility but without giving away upside.`,
  `I'm here for the tokens.`,
]

const IntroQuestionnaire = () => {
  const { InMaintenance } = ContractReads()
  const [selected, setSelected] = useState<number>(1)
  let status = false

  const data = InMaintenance().data as [boolean, number]
  if (data) {
    status = data[0] as boolean
  }

  return (
    <Card
      className={`flex relative mx-auto flex-col justify-center items-center z-20 px-[5vw] w-screen h-screen | md:mb-[10vh] md:h-fit md:w-[60vw] ${status ? 'md:mt-[20vh]' : 'md:mt-[15vh]'}`}
    >
      <h2 className="text-center text-carmesi text-3xl mb-[6vh] font-bold">Why are you here, anon?</h2>
      <div className="flex justify-center items-start w-full space-x-[5vw]">
        <PrimaryButton
          handleClick={() => setSelected(0)}
          className={`!p-0 !rounded-2xl overflow-hidden w-[100%] hover:scale-105 ${selected == 0 ? 'border-4 border-carmesi' : 'opacity-30'}`}
        >
          <div>
            <img src="/bearBeach.png" alt="pic" />
          </div>
        </PrimaryButton>
        <PrimaryButton
          handleClick={() => setSelected(1)}
          className={`!p-0 !rounded-2xl overflow-hidden w-[100%] hover:scale-105 ${selected == 1 ? 'border-4 border-carmesi' : 'opacity-30'}`}
        >
          <div>
            <img src="/bearHammock.png" alt="pic" />
          </div>
        </PrimaryButton>
        <PrimaryButton
          handleClick={() => setSelected(2)}
          className={`!p-0 !rounded-2xl overflow-hidden w-[100%] hover:scale-105 ${selected == 2 ? 'border-4 border-carmesi' : 'opacity-30'}`}
        >
          <div>
            <img src="/bearToken.png" alt="pic" />
          </div>
        </PrimaryButton>
      </div>
      <p className="py-[6vh] font-bold text-lg text-center">{options[selected]}</p>
      <div className="flex justify-center items-center">
        <Link href="/dashboard" className="font-bold hover:scale-105 bg-carmesi px-[2vw] py-[2vh] rounded-lg w-fit">
          ENTER THE $BEAR
        </Link>
      </div>
    </Card>
  )
}

export default IntroQuestionnaire

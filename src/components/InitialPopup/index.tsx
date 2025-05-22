import React, { useState } from 'react'

import { PrimaryButton } from '@/components/common/Buttons'
import Input from '@/components/common/Input'
import Modal from '@/components/common/Modal'

import { v4 as uuidv4 } from 'uuid'

const options = [
  [
    'To accumulate more token, with no leverage',
    'Momentum, a crypto native adaptation of a 30-year-old institutional investing approach used by hedge funds and asset managers.',
    'https://docs.hodlprotocol.io/hodl-101/what-is-momentum',
    'Learn more.',
  ],
  [
    'For tax-efficient profit taking (automated)',
    'Traditional profit-taking means selling and triggering taxable events. Momentum rebalances automatically, avoiding unnecessary sells and keeping you exposed without incurring capital gains taxes.',
    'https://docs.hodlprotocol.io/hodl-101/what-is-momentum/use-cases-for-momentum#key-uses-for-momentum',
    'Learn about other uses cases.',
  ],
  [
    'For a smoother crypto experience',
    'Smoothcoins, tokens designed to stabilize your portfolio by reducing the impact of market volatility.',
    'https://docs.hodlprotocol.io/hodl-101/what-are-smoothcoins',
    'Learn more',
  ],
  [
    'For responsible FOMO',
    'This strategy enables investors to participate in market rallies responsibly, minimizing the risks associated with impulsive buying.',
    'https://docs.hodlprotocol.io/hodl-101/what-are-smoothcoins/use-cases-for-smoothcoins#key-use-cases',
    'Learn about other uses cases.',
  ],
]

type InitialPopupProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const getOrCreateUserId = (): string => {
  let userId = localStorage.getItem('anonymousUserId')
  if (!userId) {
    userId = uuidv4()
    localStorage.setItem('anonymousUserId', userId)
  }
  return userId
}

const InitialPopup: React.FC<InitialPopupProps> = ({ setModal }) => {
  // const [shuffledOptions, setShuffledOptions] = useState<string[]>([])
  const [other, setOther] = useState<string>('')
  const [selectedOption, setSelectedOption] = useState<number>(0)

  // useEffect(() => {
  //   setShuffledOptions([...options].sort(() => Math.random() - 0.5))
  // }, [])

  const handleOptionOther = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOther(event.target.value)
  }

  const handleOptionClick = (index: number) => {
    setSelectedOption(index)
  }

  const handleSkip = async () => {
    const userId = getOrCreateUserId() // Get or create anonymous user ID

    try {
      const response = await fetch(`/api/store-response?userId=${userId}&response=SKIPPED`)

      if (!response.ok) {
        throw new Error('Failed to save response')
      }

      localStorage.setItem('userResponse', 'SKIPPED') // Store response locally
      setModal(false) // Close the modal
    } catch (error) {
      console.error('Error saving response:', error)
    }
  }

  const handleSubmit = async () => {
    const userId = getOrCreateUserId() // Get or create anonymous user ID

    try {
      const response = await fetch(`/api/store-response?userId=${userId}&response=${options[selectedOption][0]}`)

      if (!response.ok) {
        throw new Error('Failed to save response')
      }

      localStorage.setItem('userResponse', options[selectedOption][0]) // Store response locally
      setModal(false) // Close the modal
    } catch (error) {
      console.error('Error saving response:', error)
    }
  }

  return (
    <Modal onClose={() => handleSkip()} closeMessage=" ">
      <h3 className="mt-14 hidden px-5 text-center text-2xl text-robin md:block md:px-0">{`What's the main reason for your visit, anon?`}</h3>
      <ul className="hidden w-full grid-cols-4 gap-10 px-20 pb-10 pt-10 md:grid">
        {options.map((option, index) => (
          <div
            key={index}
            className={`relative flex cursor-pointer items-center justify-center rounded-lg hover:bg-payne ${options[selectedOption][0] == option[0] ? 'bg-payne' : 'bg-none'}`}
            onClick={() => handleOptionClick(index)}
          >
            <div className="absolute left-0 top-0 h-4 w-4 rounded-sm border-l-2 border-t-2 border-[#c1ea60]"></div>
            <div className="absolute right-0 top-0 h-4 w-4 rounded-sm border-r-2 border-t-2 border-[#c1ea60]"></div>
            <div className="absolute bottom-0 left-0 h-4 w-4 rounded-sm border-b-2 border-l-2 border-[#c1ea60]"></div>
            <div className="absolute bottom-0 right-0 h-4 w-4 rounded-sm border-b-2 border-r-2 border-[#c1ea60]"></div>

            <h3 className="p-6 text-center text-[3vw] text-white md:px-4 md:text-[16px]">{option[0]}</h3>
          </div>
        ))}
      </ul>
      <h3 className="mt-14 px-5 text-center text-2xl text-robin md:hidden md:px-0">
        {`What's the main reason`} <br />
        {`for your visit, anon?`}
      </h3>
      <ul className="py-6 md:hidden">
        {options.map((option, index) => (
          <div
            key={index}
            className="relative mx-10 flex cursor-pointer items-center justify-center border-b hover:bg-payne"
            onClick={() => handleOptionClick(index)}
          >
            <h3 className="py-2 text-center text-[3.5vw] text-white">{option[0]}</h3>ß
          </div>
        ))}
      </ul>
      <p className="mx-auto mb-10 mt-5 px-10 text-center text-lg font-thin md:w-2/3">
        {options[selectedOption][1]} <br />
        <a
          className="mx-auto w-full cursor-pointer text-center text-robin underline"
          href={options[selectedOption][2]}
          target="_blank"
        >
          {options[selectedOption][3]}
        </a>
      </p>

      <div className="mx-auto flex w-1/2 flex-col items-center justify-center">
        <Input
          placeholder="Another reason..."
          type={'text'}
          value={other}
          handleChange={handleOptionOther}
          className="rounded-t-none border-primary text-center"
        />
        <PrimaryButton handleClick={() => handleSubmit()} className="my-5 w-1/3">
          SUBMIT
        </PrimaryButton>
        <p className="mb-32 cursor-pointer hover:text-grey md:mb-10" onClick={() => handleSkip()}>
          SKIP
        </p>
      </div>
    </Modal>
  )
}

export default InitialPopup

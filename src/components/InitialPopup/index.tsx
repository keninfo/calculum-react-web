import React, { useEffect, useState } from 'react'

import { PrimaryButton } from '../common/Buttons'
import Input from '../common/Input'
import Modal from '../common/Modal'

import { v4 as uuidv4 } from 'uuid'

const options = [
  'To accumulate more of my token with no leverage',
  'For tax-efficient profit taking (automated)',
  'For a smoother crypto experience',
  'For responsible FOMO',
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
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([])
  const [other, setOther] = useState<string>('')

  useEffect(() => {
    setShuffledOptions([...options].sort(() => Math.random() - 0.5))
  }, [])

  const hadleOptionOther = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOther(event.target.value)
  }
  const handleOptionClick = async (option: string) => {
    const userId = getOrCreateUserId() // Get or create anonymous user ID

    try {
      const response = await fetch(`/api/store-response?userId=${userId}&response=${option}`)

      if (!response.ok) {
        throw new Error('Failed to save response')
      }

      localStorage.setItem('userResponse', option) // Store response locally
      setModal(false) // Close the modal
    } catch (error) {
      console.error('Error saving response:', error)
    }
  }

  return (
    <Modal onClose={() => handleOptionClick('SKIPPED')} closeMessage="SKIP">
      <h3 className="mt-14 text-center text-2xl text-robin">{`What's the main reason for your visit, anon?`}</h3>
      <ul className="grid w-full grid-cols-4 gap-10 px-20 pb-10 pt-10">
        {shuffledOptions.map((text, index) => (
          <div
            key={index}
            className="relative flex cursor-pointer items-center justify-center rounded-lg hover:bg-payne"
            onClick={() => handleOptionClick(text)}
          >
            <div className="absolute left-0 top-0 h-4 w-4 rounded-sm border-l-2 border-t-2 border-[#c1ea60]"></div>
            <div className="absolute right-0 top-0 h-4 w-4 rounded-sm border-r-2 border-t-2 border-[#c1ea60]"></div>
            <div className="absolute bottom-0 left-0 h-4 w-4 rounded-sm border-b-2 border-l-2 border-[#c1ea60]"></div>
            <div className="absolute bottom-0 right-0 h-4 w-4 rounded-sm border-b-2 border-r-2 border-[#c1ea60]"></div>

            <h3 className="p-6 text-center text-[3vw] text-white md:px-4 md:text-[16px]">{text}</h3>
          </div>
        ))}
      </ul>
      <div className="flex flex-col items-center justify-center">
        <Input
          placeholder="Another reason..."
          type={'text'}
          value={other}
          handleChange={hadleOptionOther}
          className="w-1/2 rounded-t-none border-primary text-center"
        />
        <PrimaryButton handleClick={() => handleOptionClick(other)} className="mb-10 mt-5 w-1/2">
          SUBMIT
        </PrimaryButton>
      </div>
    </Modal>
  )
}

export default InitialPopup

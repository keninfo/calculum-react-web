import React, { useState } from 'react'

import Link from 'next/link'

import { AlternateButton, PrimaryButton } from '@/components/common/Buttons'
import Modal from '@/components/common/Modal'

import Input from '../common/Input'

const Index = ({
  handleCloseModal,
  handleAccept,
  amount,
}: {
  handleCloseModal: () => void
  handleAccept: (confirmedAmount: number) => void
  amount: number
}) => {
  const [selected, setSelected] = useState<number>(1)
  const [confirmedAmount, setConfirmedAmount] = useState<number>(amount)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const number = parseFloat(event.target.value)
    setConfirmedAmount(number)
  }

  const handleAmount = () => {
    if (selected == 1) {
      return amount
    }
    if (selected == 2) {
      return confirmedAmount
    }
    return 200
  }

  return (
    <Modal onClose={handleCloseModal}>
      <h2 className="text-carmesi text-2xl my-[2vh]">Approve Contract</h2>
      <p>
        <b className="font-bold text-carmesi">First Step: </b>Approve the amount the contract is allowed to access
      </p>
      <p className="mb-[2vh]">
        <b className="font-bold text-carmesi">Second Step: </b>Confirm deposit amount
      </p>
      <Link
        href={'https://www.ledger.com/academy/ethereum-token-approvals-explained'}
        target="_blank"
        className="text-carmesi cursor-pointer"
      >
        Learn More
      </Link>
      <div className=" w-fit mx-auto mt-[4vh]">
        <PrimaryButton
          handleClick={() => setSelected(0)}
          className={`my-[4vh] !rounded-lg px-[4vw] py-[2vh] overflow-hidden w-[100%] ${selected == 0 ? 'border-4 border-carmesi' : 'opacity-80 hover:scale-105'}`}
        >
          <p>
            Approve Maximum Deposit Amount <br /> $200
          </p>
        </PrimaryButton>
        <PrimaryButton
          handleClick={() => setSelected(1)}
          className={`mb-[4vh] !rounded-lg px-[4vw] py-[2vh] overflow-hidden w-[100%] ${selected == 1 ? 'border-4 border-carmesi' : 'opacity-80 hover:scale-105 '}`}
        >
          <p>
            Approve Previously Chosen Amount
            <br /> ${amount}
          </p>
        </PrimaryButton>
        <PrimaryButton
          handleClick={() => setSelected(2)}
          className={`!block !rounded-lg px-[4vw] py-[2vh] overflow-hidden w-[100%] ${selected == 2 ? 'border-4 border-carmesi !rounded-b-none' : 'opacity-80 mb-[4vh] hover:scale-105 '}`}
        >
          <p>Approve New amount</p>
        </PrimaryButton>
        {selected == 2 && (
          <Input
            placeholder="Set Amount..."
            type={'number'}
            value={confirmedAmount}
            handleChange={handleSearch}
            className="mb-[4vh] text-center border-carmesi rounded-t-none"
          />
        )}
      </div>

      <div className="flex justify-center items-center space-x-[2vw] my-[4vh]">
        <PrimaryButton handleClick={handleCloseModal} className="w-fit py-[1vh] px-[2vw]">
          Decline
        </PrimaryButton>
        <AlternateButton handleClick={() => handleAccept(handleAmount())} className={`w-fit py-[1vh] px-[2vw]`}>
          Accept
        </AlternateButton>
      </div>
    </Modal>
  )
}

export default Index

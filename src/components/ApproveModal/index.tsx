import React, { useState } from 'react'

import Link from 'next/link'

import { AlternateButton, PrimaryButton } from '@/components/common/Buttons'
import Input from '@/components/common/Input'
import Modal from '@/components/common/Modal'

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
      <h2 className="my-[2vh] text-2xl text-carmesi">Approve Contract</h2>
      <p>
        <b className="font-bold text-carmesi">First Step: </b>Approve the amount the contract is allowed to access
      </p>
      <p className="mb-[2vh]">
        <b className="font-bold text-carmesi">Second Step: </b>Confirm deposit amount
      </p>
      <Link
        href={'https://www.ledger.com/academy/ethereum-token-approvals-explained'}
        target="_blank"
        className="cursor-pointer text-carmesi"
      >
        Learn More
      </Link>
      <div className="mx-auto mt-[4vh] w-fit">
        <PrimaryButton
          handleClick={() => setSelected(0)}
          className={`my-[4vh] w-[100%] overflow-hidden !rounded-lg px-[4vw] py-[2vh] ${selected == 0 ? 'border-4 border-carmesi' : 'opacity-80 hover:scale-105'}`}
        >
          <p>
            Approve Maximum Deposit Amount <br /> $200
          </p>
        </PrimaryButton>
        <PrimaryButton
          handleClick={() => setSelected(1)}
          className={`mb-[4vh] w-[100%] overflow-hidden !rounded-lg px-[4vw] py-[2vh] ${selected == 1 ? 'border-4 border-carmesi' : 'opacity-80 hover:scale-105'}`}
        >
          <p>
            Approve Previously Chosen Amount
            <br /> ${amount}
          </p>
        </PrimaryButton>
        <PrimaryButton
          handleClick={() => setSelected(2)}
          className={`!block w-[100%] overflow-hidden !rounded-lg px-[4vw] py-[2vh] ${selected == 2 ? '!rounded-b-none border-4 border-carmesi' : 'mb-[4vh] opacity-80 hover:scale-105'}`}
        >
          <p>Approve New amount</p>
        </PrimaryButton>
        {selected == 2 && (
          <Input
            placeholder="Set Amount..."
            type={'number'}
            value={confirmedAmount}
            handleChange={handleSearch}
            className="mb-[4vh] rounded-t-none border-carmesi text-center"
          />
        )}
      </div>

      <div className="my-[4vh] flex items-center justify-center space-x-[2vw]">
        <PrimaryButton handleClick={handleCloseModal} className="w-fit px-[2vw] py-[1vh]">
          Decline
        </PrimaryButton>
        <AlternateButton handleClick={() => handleAccept(handleAmount())} className={`w-fit px-[2vw] py-[1vh]`}>
          Accept
        </AlternateButton>
      </div>
    </Modal>
  )
}

export default Index

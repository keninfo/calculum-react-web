import React, { useState } from 'react'

import ApproveModal from '@/components/Disclaimer'
import { PrimaryButton } from '@/components/common/Buttons'
import useApprove from '@/hooks/useApprove'

const Approve = ({ amount }: { amount: number }) => {
  const { ApproveAssets, isPending } = useApprove()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAgreeChecked, setIsAgreeChecked] = useState(false)

  const handleApproveClick = () => {
    setIsModalOpen(true)
  }

  const handleAccept = () => {
    ApproveAssets(amount)
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setIsAgreeChecked(false) // Reset agreement state when closing modal
  }

  const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreeChecked(e.target.checked)
  }

  return (
    <>
      <PrimaryButton handleClick={handleApproveClick} disabled={isPending}>
        {isPending ? 'Approving...' : 'Approve'}
      </PrimaryButton>
      {isModalOpen && (
        <ApproveModal
          isAgreeChecked={isAgreeChecked}
          handleCloseModal={handleCloseModal}
          handleAgreeChange={handleAgreeChange}
          handleAccept={handleAccept}
        />
      )}
    </>
  )
}

export default Approve

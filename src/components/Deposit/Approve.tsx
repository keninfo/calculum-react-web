import React, { useState, useEffect } from 'react'

import ApproveModal from '@/components/ApproveModal'
import { PrimaryButton } from '@/components/common/Buttons'
import useApprove from '@/hooks/useApprove'

interface ApproveProps {
  amount: number
  onConfirm: () => void
}

const Approve: React.FC<ApproveProps> = ({ amount, onConfirm }) => {
  const { ApproveAssets, isPending, isConfirmed } = useApprove()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleApproveClick = () => {
    setIsModalOpen(true)
  }

  const handleAccept = (confirmedAmount: number) => {
    ApproveAssets(confirmedAmount)
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (isConfirmed) {
      onConfirm()
    }
  }, [isConfirmed, onConfirm])

  return (
    <>
      <PrimaryButton handleClick={handleApproveClick} disabled={isPending}>
        {isPending ? 'Approving...' : 'Approve'}
      </PrimaryButton>
      {isModalOpen && <ApproveModal handleCloseModal={handleCloseModal} handleAccept={handleAccept} amount={amount} />}
    </>
  )
}

export default Approve

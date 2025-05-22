import type { FC } from 'react'

import Image from 'next/image'

interface MaintenanceDialogProps {
  onClose: () => void
}

const MaintenanceDialog: FC<MaintenanceDialogProps> = ({ onClose }) => {
  return (
    <dialog
      open
      className="fixed inset-0 bottom-0 left-0 right-0 top-0 z-50 flex h-dvh w-full items-center justify-center overflow-hidden bg-[#1E1E1EB2]"
    >
      <div className="relative flex h-[228px] max-w-[696px] flex-col gap-8 rounded-lg bg-[#008489] px-5 py-[51px] text-center text-white md:px-[64px]">
        <button onClick={onClose} className="absolute right-4 top-4">
          <Image src={'/icons/close_icon_yellow.svg'} alt={'close'} width={20} height={20} />
        </button>
        <p className="text-4xl font-bold">Feature Upgrade</p>
        <p>
          We’re currently upgrading this feature for a smoother user experience, and it will be operational again within
          48 hours.
        </p>
      </div>
    </dialog>
  )
}
export default MaintenanceDialog

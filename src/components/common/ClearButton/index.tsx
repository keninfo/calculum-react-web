import type { ReactNode } from 'react'

import { Button } from '@mui/base'

type ClearButtonProps = {
  handleClickClearButton: () => void
  children: ReactNode
}

const ClearButton = ({ handleClickClearButton, children }: ClearButtonProps) => (
  <Button
    onClick={handleClickClearButton}
    className="bg-smoke py-6 flex justify-center rounded-xl text-carmesi shadow-2xl hover:scale-110 w-[100%]"
  >
    {children}
  </Button>
)

export default ClearButton

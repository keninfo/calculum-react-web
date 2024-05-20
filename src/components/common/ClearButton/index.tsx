import type { ReactNode } from 'react'

import { Button } from '@mui/base'

type ClearButtonProps = {
  handleClickClearButton: () => void
  children: ReactNode
}

const ClearButton = ({ handleClickClearButton, children }: ClearButtonProps) => (
  <Button
    onClick={handleClickClearButton}
    className="bg-smoke py-6 flex justify-center rounded-xl text-white  hover:scale-110 w-[100%] hover:text-carmesi"
  >
    {children}
  </Button>
)

export default ClearButton

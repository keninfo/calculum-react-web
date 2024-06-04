import type { ReactNode } from 'react'

import { Button } from '@mui/base'

type ClearButtonProps = {
  handleClickClearButton: () => void
  children: ReactNode
  disabled?: boolean
}

const ClearButton = ({ handleClickClearButton, children, disabled }: ClearButtonProps) => (
  <Button
    onClick={handleClickClearButton}
    className="bg-smoke py-6 flex justify-center text-white  hover:scale-110 w-[100%] hover:text-carmesi"
    disabled={disabled}
  >
    {children}
  </Button>
)

export default ClearButton

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
    className="flex w-[100%] justify-center !rounded-lg bg-smoke py-6 text-white hover:scale-110 hover:text-carmesi"
    disabled={disabled}
  >
    {children}
  </Button>
)

export default ClearButton

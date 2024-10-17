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
    className="flex w-[100%] justify-center !rounded-md !rounded-t-none bg-carmesi px-[2vw] py-[1vh] text-white hover:text-smoke hover:brightness-125"
    disabled={disabled}
  >
    {children}
  </Button>
)

export default ClearButton

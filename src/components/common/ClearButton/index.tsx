import type { ReactNode } from 'react'

import { Button } from '@mui/base'

type ClearButtonProps = {
  handleClickClearButton: () => void
  children: ReactNode
}

const ClearButton = ({ handleClickClearButton, children }: ClearButtonProps) => (
  <Button
    onClick={handleClickClearButton}
    className="bg-smoke px-10 py-5 rounded-xl text-carmesi shadow-2xl hover:scale-110 hover:bg-white"
  >
    {children}
  </Button>
)

export default ClearButton

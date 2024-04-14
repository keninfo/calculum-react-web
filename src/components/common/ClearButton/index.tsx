import type { ReactNode } from 'react'

import { Button } from '@mui/material'

type ClearButtonProps = {
  handleClickClearButton: () => void
  children: ReactNode
}

const ClearButton = ({ handleClickClearButton, children }: ClearButtonProps) => (
  <Button variant="contained" onClick={handleClickClearButton}>
    {children}
  </Button>
)

export default ClearButton

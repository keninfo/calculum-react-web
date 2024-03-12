import type { ReactNode } from 'react'
import { Button } from '@mui/material'

type ClearButtonProps = {
  handleClickClearButton: () => void
  children: ReactNode
}

const ClearButton = ({ handleClickClearButton, children }: ClearButtonProps) => (
  <Button
    variant="contained"
    sx={{ width: 'inherit', color: '#fff', backgroundColor: '#3c3c3c' }}
    onClick={handleClickClearButton}
  >
    {children}
  </Button>
)

export default ClearButton

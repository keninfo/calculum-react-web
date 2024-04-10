import type { ReactNode } from 'react'

import { Grid } from '@mui/material'

type VaultTitleProps = {
  customTitle: string | ReactNode
}

const VaultTitle = ({ customTitle }: VaultTitleProps) => (
  <Grid
    container
    display="flex"
    justifyContent="center"
    alignItems="center"
    pb={1}
    sx={{ borderBottom: '1px solid #fbc216' }}
  >
    {customTitle}
  </Grid>
)

export default VaultTitle

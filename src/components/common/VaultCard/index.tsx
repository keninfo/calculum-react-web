import type { ReactNode } from 'react'
import { Paper, Typography, Grid } from '@mui/material'

type VaultCardProps = {
  title: string
  children: ReactNode
}

const VaultCard = ({ title, children }: VaultCardProps) => (
  <Paper sx={{ backgroundColor: '#3c3c3c', border: '1px solid white', height: '100%' }}>
    <Grid container direction="column" alignItems="center" spacing={2} p={2}>
      <Grid item>
        <Typography>{title}</Typography>
      </Grid>

      <Grid item>{children}</Grid>
    </Grid>
  </Paper>
)

export default VaultCard

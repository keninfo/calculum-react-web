import type { ReactNode } from 'react'
import { Paper, Grid } from '@mui/material'

type VaultCardProps = {
  title: string | ReactNode
  children: ReactNode
}

const VaultCard = ({ title, children }: VaultCardProps) => (
  <Paper sx={{ backgroundColor: '#3c3c3c', border: '1px solid white', height: '100%' }}>
    <Grid container spacing={0} p={4}>
      <Grid item xs>
        {title}
      </Grid>
      <Grid item>{children}</Grid>
    </Grid>
  </Paper>
)

export default VaultCard

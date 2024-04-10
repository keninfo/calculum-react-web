import { Grid, Typography } from '@mui/material'

import VaultCard from '@/components/common/VaultCard'
import VaultTitle from '@/components/common/VaultTitle'

const LongShortVault = () => {
  return (
    <VaultCard
      title={
        <VaultTitle
          customTitle={
            <Typography variant="h3" fontWeight="bold">
              <span style={{ color: '#fbc216' }}>VAULT #2:</span> LONG-SHORT MOMENTUM STRATEGY
            </Typography>
          }
        />
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>Coming soon...</Typography>
        </Grid>
      </Grid>
    </VaultCard>
  )
}

export default LongShortVault

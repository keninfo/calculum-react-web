import { Grid, Typography } from '@mui/material'

import VaultCard from '@/components/common/VaultCard'
import VaultTitle from '@/components/common/VaultTitle'

const TBAVault = () => (
  <VaultCard
    title={
      <VaultTitle
        customTitle={
          <Typography variant="h3" fontWeight="bold">
            <span style={{ color: '#fbc216' }}>VAULT #3:</span> TBA
          </Typography>
        }
      />
    }
  >
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>Coming later...</Typography>
      </Grid>
    </Grid>
  </VaultCard>
)

export default TBAVault

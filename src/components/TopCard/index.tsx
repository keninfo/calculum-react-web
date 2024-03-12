import { Box, Grid, Typography } from '@mui/material'

import css from './styles.module.css'

const TopCard = () => {
  return (
    <Box className={css.container}>
      <Grid container className={css.mainLema}>
        <Grid item xs={12}>
          <Typography variant="h3">
            <b>
              <span style={{ color: '#fbc216' }}>CALCULUM</span>
            </b>
            , Democratize access to professional-grade, fully-automated, quantitative trading strategies
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        // dense className="pt-3 mt-3" style={{ borderTop: '1px solid #fbc216' }}
        className={css.info}
      >
        <Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h2">Total Value Locked: $50k</Typography>
        </Grid>

        <Grid item xs={6} display="flex" justifyContent="center" alignItems="flex-start">
          <Typography variant="h2" mr={1}>
            Net APY: 20.0%
          </Typography>
          <Typography variant="h2">Average since inception</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TopCard

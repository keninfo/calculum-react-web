import { Paper, Container, Grid, Typography } from '@mui/material'

const TopCard = () => {
  return (
    <Paper
      style={{
        backgroundColor: '#3c3c3c',
        borderRadius: '16px',
        padding: '8px',
        border: '1px solid white',
      }}
    >
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6" style={{ fontSize: '1.5rem' }} className="pb-1 card-title">
              <b>
                <span className="text-yellow">CALCULUM</span>
              </b>
              , Democratize access to professional-grade, fully-automated, quantitative trading strategies
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          // dense className="pt-3 mt-3" style={{ borderTop: '1px solid #fbc216' }}
        >
          <Grid item xs={6} className="text-center right-border-yellow">
            <Typography variant="h5" style={{ fontSize: '1.75rem' }}>
              Total Value Locked: $50k
            </Typography>
          </Grid>
          <Grid item xs={6} className="text-center">
            <Typography variant="h5" style={{ fontSize: '1.75rem' }}>
              Net APY: 20.0%
            </Typography>
            <Typography variant="body1" style={{ fontSize: '1.5rem' }} className="ml-2">
              Average since inception
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  )
}

export default TopCard

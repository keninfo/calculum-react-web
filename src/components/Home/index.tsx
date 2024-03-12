import { Grid, Link, Paper, Typography } from '@mui/material'
import TopCard from '../TopCard'
import LongOnlyVault from '@/components/LongOnlyVault'
import LongShortVault from '@/components/LongShortVault'
import TBAVault from '@/components/TBAVault'

import css from './styles.module.css'

const Home = () => {
  return (
    <Grid container className={css.main}>
      <Grid item xs className={css.menu}>
        <Paper sx={{ marginLeft: '30px', backgroundColor: ({ palette }) => palette.background.main }}>
          <Typography variant="h3" className={css.typography}>
            <Link href="#">
              <span style={{ color: '#fbc216' }}>{'>_'}</span>Home
            </Link>
          </Typography>

          <Typography variant="h3" className={css.typography}>
            <Link href="#">
              <span style={{ color: '#fbc216' }}>{'>_'}</span>Vaults
            </Link>
          </Typography>

          <Typography variant="h3" className={css.typography}>
            <Link href="https://calculum.gitbook.io/calculum-docs" target="_blank" rel="noopener noreferrer">
              <span style={{ color: '#fbc216' }}>{'>_'}</span>Docs
            </Link>
          </Typography>

          <Typography variant="h3" className={css.typography}>
            <Link href="https://medium.com/@CalculumFi" target="_blank" rel="noopener noreferrer">
              <span style={{ color: '#fbc216' }}>{'>_'}</span>Blog
            </Link>
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={11}>
        <Grid item className={css.topCard}>
          <TopCard />
        </Grid>

        <Grid item className={css.vaultCards}>
          <Grid item xs={3.9}>
            <LongOnlyVault />
          </Grid>

          <Grid item xs={3.9}>
            <LongShortVault />
          </Grid>

          <Grid item xs={3.9}>
            <TBAVault />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Home

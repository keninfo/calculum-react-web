import { Box, Grid } from '@mui/material'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/common/Header'
import AssetsHeader from '@/components/common/AssetsHeader'
import PriceChart from '@/components/PriceChart'
import CollateralsTable from '@/components/CollateralsTable'
import TxInteraction from '@/components/TxInteraction'
import OwnBalances from '@/components/OwnBalances'

import css from './styles.module.css'

const Home = () => (
  <>
    <header className={css.headerContainer}>
      <Box className={css.headerContent}>
        <Box className={css.header}>
          <Header />
        </Box>
      </Box>
    </header>

    <div>
      <aside className={css.sidebar}>
        <Sidebar />
      </aside>
    </div>

    <Box className={css.main}>
      <div className={css.content}>
        <AssetsHeader />

        <Box className={css.cards}>
          <Grid container spacing={2} className={css.cardsContainer}>
            <Grid item xs={9}>
              <Box className={css.card}>
                <PriceChart />
              </Box>

              <Box className={css.card}>
                <CollateralsTable />
              </Box>
            </Grid>

            <Grid item xs={3}>
              <Box className={css.card}>
                <TxInteraction />
              </Box>

              <Box className={css.card}>
                <OwnBalances />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Box>
  </>
)

export default Home

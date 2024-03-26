import { type ChangeEvent, useState } from 'react'

import {
  Box,
  Grid,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material'
import Sidebar from '../Sidebar'
import Header from '../common/Header'

import css from './styles.module.css'

const Home = () => {
  const [activeTab, setActiveTab] = useState<number>(0)
  const actionButtonLabel = activeTab === 0 ? 'Deposit' : activeTab === 1 ? 'Claim' : activeTab === 2 ? 'Withdraw' : ''

  const handleTabChange = (event: ChangeEvent<{}>, newValue: number) => setActiveTab(newValue)

  const actions = ['Depositing', 'Claiming', 'Withdrawing'] // ! This is provitional

  // ! This whole code is provitional, while I define the proper actions
  // TODO: set proper actions
  const handleClickActionButton = () => {
    if (activeTab >= 0 && activeTab < actions.length) {
      const action = activeTab === 0 ? actions[0] : actions[activeTab]
      console.log(action)
    } else console.log('Unknown action')
  }

  return (
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

      {/* TODO: Isolate all of this in different component */}
      <Box className={css.main}>
        <div className={css.content}>
          {/* Assets header */}
          <Box className={css.assetStats}>
            <Typography>BTC/USD</Typography>
            <Box className={css.assetMetrics}>
              <Box className={css.metric}>
                <Typography>Last price</Typography>
                <Typography>0.058505 $390.68</Typography>
              </Box>
              <Box className={css.metric}>
                <Typography>24h Change</Typography>
                <Typography>0.0011447</Typography>
              </Box>
              <Box className={css.metric}>
                <Typography>24h High</Typography>
                <Typography>0.060069</Typography>
              </Box>
              <Box className={css.metric}>
                <Typography>24h Low</Typography>
                <Typography>0.056864</Typography>
              </Box>
              <Box className={css.metric}>
                <Typography>24h Volume</Typography>
                <Typography>8,532.12 BTC</Typography>
              </Box>
            </Box>
          </Box>

          {/* Cards Prov */}
          <Box className={css.cards}>
            <Grid container spacing={2} className={css.cardsContainer}>
              <Grid item xs={9}>
                <Box className={css.card}>
                  <Box p={20}>
                    <Typography>HERE GOES THE CHART!!</Typography>
                  </Box>
                </Box>

                <Box className={css.card}>
                  <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" p={10}>
                    <Typography variant="h2" mb={2}>
                      Collaterals
                    </Typography>

                    <Box className={css.collateralsTable}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>ASSET</TableCell>
                            <TableCell>APY</TableCell>
                            <TableCell>COMPOSITION</TableCell>
                            <TableCell>VALUE</TableCell>
                            <TableCell>ACTIONS</TableCell>
                          </TableRow>
                        </TableHead>
                      </Table>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={3}>
                <Box className={css.card}>
                  <Tabs value={activeTab} indicatorColor="primary" onChange={handleTabChange}>
                    <Tab
                      label={
                        <Typography variant="body2" fontWeight={700}>
                          Deposit
                        </Typography>
                      }
                    />
                    <Tab
                      label={
                        <Typography variant="body2" fontWeight={700}>
                          Claim
                        </Typography>
                      }
                    />
                    <Tab
                      label={
                        <Typography variant="body2" fontWeight={700}>
                          Withdraw
                        </Typography>
                      }
                    />
                  </Tabs>
                  <Box className={css.cardAction}>
                    <TextField />
                    <Button variant="contained" sx={{ marginTop: '50px' }} onClick={handleClickActionButton}>
                      {actionButtonLabel}
                    </Button>
                  </Box>
                </Box>

                <Box className={css.card}>
                  <Box display="flex" flexDirection="column" alignItems="center" p={4}>
                    <Typography mb={2}>Your Balance</Typography>
                    <Typography variant="h3">$132,832.89</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Box>
    </>
  )
}

export default Home

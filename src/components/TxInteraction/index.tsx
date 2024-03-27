import { type ChangeEvent, useState } from 'react'
import { Box, Tabs, Tab, Typography } from '@mui/material'

import TxActions from './TxActions'

import css from './styles.module.css'

const TxInteraction = () => {
  const [activeTab, setActiveTab] = useState<number>(0)
  const actionButtonLabel = activeTab === 0 ? 'Deposit' : activeTab === 1 ? 'Claim' : activeTab === 2 ? 'Withdraw' : ''

  const handleTabChange = (event: ChangeEvent<{}>, newValue: number) => setActiveTab(newValue)

  return (
    <Box className={css.txActionContent}>
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

      <TxActions activeTab={activeTab} label={actionButtonLabel} />
    </Box>
  )
}

export default TxInteraction

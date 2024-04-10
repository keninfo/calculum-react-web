import { type ChangeEvent, useState } from 'react'

import { Box, Tabs, Tab, Typography } from '@mui/material'

import TxActions from './TxActions'
import css from './styles.module.css'

const TxInteraction = () => {
  const [activeTab, setActiveTab] = useState<number>(0)
  const [subTab, setSubTab] = useState<number>(0)
  const actionButtonLabel = activeTab === 0 ? 'Deposit' : activeTab === 1 ? 'Claim' : activeTab === 2 ? 'Withdraw' : ''

  const handleTabChange = (event: ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue)
    setSubTab(0)
  }

  const handleSubTabChange = (event: ChangeEvent<{}>, newValue: number) => setSubTab(newValue)

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
              Take money out
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
      </Tabs>

      {activeTab === 1 && (
        <Box>
          <Tabs value={subTab} indicatorColor="primary" onChange={handleSubTabChange}>
            {/* usar withdraw (cantidad de assets) en el contrato (USDC 1e6) */}
            <Tab
              label={
                <Typography variant="body2" fontWeight={700}>
                  Withdraw
                </Typography>
              }
            />
            {/* usar redeem en el contrato (Shares 1e18) */}
            <Tab
              label={
                <Typography variant="body2" fontWeight={700}>
                  Redeem
                </Typography>
              }
            />
          </Tabs>
        </Box>
      )}
      {activeTab === 2 && (
        <Box>
          <Tabs value={subTab} indicatorColor="primary" onChange={handleSubTabChange}>
            {/* claimAssets */}
            <Tab
              label={
                <Typography variant="body2" fontWeight={700}>
                  Assets
                </Typography>
              }
            />
            {/* claimShares */}
            <Tab
              label={
                <Typography variant="body2" fontWeight={700}>
                  Shares
                </Typography>
              }
            />
          </Tabs>
        </Box>
      )}

      <TxActions activeTab={activeTab} activeSubTab={subTab} label={actionButtonLabel} />
    </Box>
  )
}

export default TxInteraction

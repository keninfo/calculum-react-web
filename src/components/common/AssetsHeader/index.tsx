import { Box, Typography } from '@mui/material'

import css from './styles.module.css'

const AssetsHeader = () => {
  return (
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
  )
}

export default AssetsHeader

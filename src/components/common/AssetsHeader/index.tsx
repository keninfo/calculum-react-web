import { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { Box, Typography } from '@mui/material'

import { fetchPrices } from '@/store/pricesSlice'
import { type AppDispatch, useAppSelector } from '@/store/store'
import { formatPrice } from '@/utils/formatters'

import css from './styles.module.css'

const AssetsHeader = () => {
  const dispatch = useDispatch<AppDispatch>()
  const prices = useAppSelector((state) => state.prices)

  useEffect(() => {
    dispatch(fetchPrices())
  }, [dispatch])

  const BTCUSDCSpot = prices.prices ? prices.prices['1'] : ''

  const formatted = formatPrice(BTCUSDCSpot)

  return (
    <Box className={css.assetStats}>
      <Typography>BTC/USD</Typography>
      <Box className={css.assetMetrics}>
        <Box className={css.metric}>
          <Typography>Last price</Typography>
          <Typography>${formatted}</Typography>
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

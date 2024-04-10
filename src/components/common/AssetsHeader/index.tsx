import { useState, useEffect, useMemo } from 'react'

import { useDispatch } from 'react-redux'

import { Box, Typography, Select, MenuItem, type SelectChangeEvent, FormControl, InputLabel } from '@mui/material'

import { type StatsPerPrices, fetchPerpPrices } from '@/store/perpPricesSlice'
import { type AppDispatch, useAppSelector } from '@/store/store'
import { assetsList } from '@/utils/assetsList'
import { formatPercentage, formatPrice } from '@/utils/formatters'

import css from './styles.module.css'

export type ProductItem = {
  product_id: number
  symbol: string
}

const AssetsHeader = () => {
  const dispatch = useDispatch<AppDispatch>()

  const perpPrices = useAppSelector((state) => state.perpPrices)

  const [selectedAsset, setSelectedAsset] = useState<string>('BTC-PERP')

  const handleAssetChange = (event: SelectChangeEvent) => setSelectedAsset(event.target.value)

  useEffect(() => {
    dispatch(fetchPerpPrices())
  }, [dispatch])

  const perpAsset = useMemo(() => {
    const perpPricesList: Record<string, {}> = perpPrices.perpPrices
    if (!perpPricesList) return { price: '', volume: '', baseVolume: '', percentageChange: '' }

    const selectedTickerProduct = assetsList.find((a) => a.label === selectedAsset)?.ticker

    if (!selectedTickerProduct) return { price: '', volume: '', baseVolume: '', percentageChange: '' }
    const statsPerProduct = perpPricesList[selectedTickerProduct] as StatsPerPrices

    return {
      price: formatPrice(statsPerProduct.last_price.toString()),
      volume: formatPrice(statsPerProduct.quote_volume.toString()),
      baseVolume: formatPrice(statsPerProduct.base_volume.toString()),
      percentageChange: formatPercentage(statsPerProduct.price_change_percent_24h),
    }
  }, [perpPrices.perpPrices, selectedAsset])

  return (
    <Box className={css.assetStats}>
      <FormControl>
        <InputLabel id="assets-label">Perps</InputLabel>
        <Select labelId="assets-label" label="Perps" value={selectedAsset} onChange={handleAssetChange}>
          {assetsList.map((asset) => (
            <MenuItem key={asset.label} value={asset.label}>
              {asset.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box className={css.assetMetrics}>
        <Box className={css.metric}>
          <Typography>Last price</Typography>
          <Typography>${perpAsset.price}</Typography>
        </Box>
        <Box className={css.metric}>
          <Typography>24h Change</Typography>
          <Typography>{perpAsset.percentageChange}</Typography>
        </Box>
        <Box className={css.metric}>
          <Typography>24h Volume (USD)</Typography>
          <Typography>${perpAsset.volume}</Typography>
        </Box>
        <Box className={css.metric}>
          <Typography>24h Volume</Typography>
          <Typography>{perpAsset.baseVolume}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default AssetsHeader

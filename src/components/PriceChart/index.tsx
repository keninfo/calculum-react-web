import { useMemo } from 'react'

import { Box, Typography } from '@mui/material'

import { useAppSelector } from '@/store/store'
import { assetsList } from '@/utils/assetsList'

import ChartContainer from './ChartContainer'

const PriceChart = () => {
  const selectedAsset = useAppSelector((state) => state.selectedAsset)

  const chartLabel = useMemo(() => {
    const label = assetsList.find((a) => a.label === selectedAsset.selectedAsset)?.fullName
    if (!label) return ''

    return label
  }, [selectedAsset.selectedAsset])

  return (
    <Box p={2} width="100%" height="100%">
      <Typography>{chartLabel}</Typography>
      <ChartContainer />
    </Box>
  )
}

export default PriceChart

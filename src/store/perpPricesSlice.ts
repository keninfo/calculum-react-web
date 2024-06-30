/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

export interface PerpPricesProps {
  perpPrices: any | null
  loading: boolean
  error: boolean
}

export type StatsPerPrices = {
  ticker_id: string
  base_currency: string
  quote_currency: string
  last_price: number
  base_volume: number
  quote_volume: number
  price_change_percent_24h: number
}

const initialState: PerpPricesProps = {
  perpPrices: null,
  loading: false,
  error: false,
}

const vertexArchiveUrl = 'https://archive.prod.vertexprotocol.com/v2'

export const fetchPerpPrices = createAsyncThunk('stats/fetchPerpPrices', async () => {
  const res = await axios.get(`${vertexArchiveUrl}/tickers?=market={spot|perp}`)
  const prices = res.data

  return prices
})

const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPerpPrices.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(fetchPerpPrices.fulfilled, (state, action) => {
        state.perpPrices = action.payload
        state.loading = false
        state.error = false
      })
      .addCase(fetchPerpPrices.rejected, (state) => {
        state.loading = false
        state.error = true
      })
  },
})

export default pricesSlice.reducer

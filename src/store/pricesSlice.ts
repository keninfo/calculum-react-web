/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

import { queryPrices } from '@/hooks/queries/queryPrices'

export interface PricesProps {
  prices: any | null
  loading: boolean
  error: boolean
}

const initialState: PricesProps = {
  prices: null,
  loading: false,
  error: false,
}

const vertexGatewayUrl = 'https://gateway.prod.vertexprotocol.com/v1'

export const fetchPrices = createAsyncThunk('stats/fetchPrices', async () => {
  const res = await axios.get(`${vertexGatewayUrl}/query?type=all_products`)
  const prices = queryPrices(res.data.data.perp_products)

  return prices
})

const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrices.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(fetchPrices.fulfilled, (state, action) => {
        state.prices = action.payload
        state.loading = false
        state.error = false
      })
      .addCase(fetchPrices.rejected, (state) => {
        state.loading = false
        state.error = true
      })
  },
})

export default pricesSlice.reducer

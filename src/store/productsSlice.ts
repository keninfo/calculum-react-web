/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

export interface ProductsProps {
  products: any | null
  loading: boolean
  error: boolean
}

const initialState: ProductsProps = {
  products: null,
  loading: false,
  error: false,
}

const vertexGatewayUrl = 'https://gateway.prod.vertexprotocol.com/v1'

export const fetchProducts = createAsyncThunk('stats/fetchProducts', async () => {
  const res = await axios.get(`${vertexGatewayUrl}/symbols`)

  return res.data
})

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.loading = false
        state.error = false
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false
        state.error = true
      })
  },
})

export default productsSlice.reducer

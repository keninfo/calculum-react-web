import { configureStore } from '@reduxjs/toolkit'

import { type TypedUseSelectorHook, useSelector } from 'react-redux'

import perpPricesSlice from './perpPricesSlice'
import pricesSlice from './pricesSlice'
import productsSlice from './productsSlice'

export const store = configureStore({
  reducer: {
    prices: pricesSlice,
    perpPrices: perpPricesSlice,
    product: productsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

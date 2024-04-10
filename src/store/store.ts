import { configureStore } from '@reduxjs/toolkit'

import { type TypedUseSelectorHook, useSelector } from 'react-redux'

import pricesSlice from './pricesSlice'

export const store = configureStore({
  reducer: {
    prices: pricesSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

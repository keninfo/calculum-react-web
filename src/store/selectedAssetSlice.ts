import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type SelectedAssetState = {
  selectedAsset: string
}

const initialState: SelectedAssetState = {
  selectedAsset: 'BTC-PERP',
}

const selectedAssetSlice = createSlice({
  name: 'selectedAsset',
  initialState,
  reducers: {
    setSelectedAsset: (state, action: PayloadAction<string>) => {
      state.selectedAsset = action.payload
    },
  },
})

export const { setSelectedAsset } = selectedAssetSlice.actions

export default selectedAssetSlice.reducer

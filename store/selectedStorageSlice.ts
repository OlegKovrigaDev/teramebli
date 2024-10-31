import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type StorageKey =
	| 'paramsFrom_01_MebliBalta'
	| 'paramsFrom_02_MebliPodilsk'
	| 'paramsFrom_03_MebliPervomaisk'
	| 'paramsFrom_04_MebliOdesa1'
	| 'paramsFrom_05_MebliVoznesensk'

interface SelectedStorageState {
	storage: StorageKey
}

const initialState: SelectedStorageState = {
	storage: 'paramsFrom_01_MebliBalta',
}

const selectedStorageSlice = createSlice({
	name: 'selectedStorage',
	initialState,
	reducers: {
		setSelectedStorage: (state, action: PayloadAction<StorageKey>) => {
			state.storage = action.payload
		},
	},
})

export const { setSelectedStorage } = selectedStorageSlice.actions
export default selectedStorageSlice.reducer

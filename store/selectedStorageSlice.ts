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

const getInitialStorage = (): StorageKey => {
	if (typeof window !== 'undefined') {
		return (
			(localStorage.getItem('selectedStorage') as StorageKey) ||
			'paramsFrom_03_MebliPervomaisk'
		)
	}
	return 'paramsFrom_03_MebliPervomaisk'
}

const initialState: SelectedStorageState = {
	storage: getInitialStorage(),
}

const selectedStorageSlice = createSlice({
	name: 'selectedStorage',
	initialState,
	reducers: {
		setSelectedStorage: (state, action: PayloadAction<StorageKey>) => {
			state.storage = action.payload
			if (typeof window !== 'undefined') {
				localStorage.setItem('selectedStorage', action.payload)
			}
		},
	},
})

export const { setSelectedStorage } = selectedStorageSlice.actions
export default selectedStorageSlice.reducer

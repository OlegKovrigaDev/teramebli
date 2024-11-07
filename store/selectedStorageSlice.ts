import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useEffect } from 'react'

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
	storage: 'paramsFrom_03_MebliPervomaisk',
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
		setInitialStorage: (state, action: PayloadAction<StorageKey>) => {
			state.storage = action.payload
		},
	},
})

export const { setSelectedStorage, setInitialStorage } =
	selectedStorageSlice.actions
export default selectedStorageSlice.reducer

// // Хук для получения начального значения
// export const useInitializeStorage = () => {
// 	const dispatch = useDispatch()
// 	useEffect(() => {
// 		if (typeof window !== 'undefined') {
// 			const storedValue = localStorage.getItem('selectedStorage') as StorageKey
// 			if (storedValue) {
// 				dispatch(setInitialStorage(storedValue))
// 			}
// 		}
// 	}, [dispatch])
// }

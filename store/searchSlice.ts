import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SearchState {
	query: string
	results: any[]
	isLoading: boolean
	error: string | null
}

const initialState: SearchState = {
	query: '',
	results: [],
	isLoading: false,
	error: null,
}

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setQuery(state, action: PayloadAction<string>) {
			state.query = action.payload
		},
		setResults(state, action: PayloadAction<any[]>) {
			state.results = action.payload
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		setError(state, action: PayloadAction<string | null>) {
			state.error = action.payload
		},
	},
})

export const { setQuery, setResults, setLoading, setError } =
	searchSlice.actions
export default searchSlice.reducer

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { categoryApi } from '@/api/categoryApi'
import cartReducer from './cartSlice'
import searchReducer from './searchSlice'

export const store = configureStore({
	reducer: {
		[categoryApi.reducerPath]: categoryApi.reducer,
		cart: cartReducer,
		search: searchReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(categoryApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

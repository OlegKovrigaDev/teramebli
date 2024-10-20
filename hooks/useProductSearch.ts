import { useState } from 'react'
import { useSearchProductsQuery } from '@/api/categoryApi'
import { Product } from '@/types/redux'

interface UseProductSearchResult {
	query: string
	setQuery: (query: string) => void
	searchResults: Product[] | undefined
	isLoading: boolean
	error: any
	handleSearch: () => void
	handleEnterKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export const useProductSearch = (): UseProductSearchResult => {
	const [query, setQuery] = useState<string>('')

	const {
		data: searchResults,
		error,
		isLoading,
	} = useSearchProductsQuery(query, {
		skip: !query,
	})

	const handleSearch = () => {
		if (query) {
			console.log(`Searching for: ${query}`)
		}
	}

	const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearch()
		}
	}

	return {
		query,
		setQuery,
		searchResults,
		isLoading,
		error,
		handleSearch,
		handleEnterKeyPress,
	}
}

import { useState, useEffect } from 'react'
import { useSearchProductsQuery } from '@/api/categoryApi'
import { Product } from '@/types/redux'

interface UseProductSearchResult {
	query: string
	setQuery: (query: string) => void
	searchResults: Product[] | undefined
	isLoading: boolean
	error: any
}

export const useProductSearch = (
	initialQuery: string = ''
): UseProductSearchResult => {
	const [query, setQuery] = useState<string>(initialQuery)

	const {
		data: searchResults,
		error,
		isLoading,
	} = useSearchProductsQuery(query, {
		skip: !query,
	})

	useEffect(() => {
		if (initialQuery) {
			setQuery(initialQuery)
		}
	}, [initialQuery])

	return {
		query,
		setQuery,
		searchResults,
		isLoading,
		error,
	}
}

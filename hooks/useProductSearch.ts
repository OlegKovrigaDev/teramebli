import { useState, useEffect } from 'react'
import { useSearchProductsQuery } from '@/api/categoryApi'
import { Product } from '@/types/redux'

interface UseProductSearchResult {
	query: string
	setQuery: (query: string) => void
	searchResults: Product[] | undefined
	total: number
	isLoading: boolean
	error: any
	totalPages: number
	currentPage: number
	setPage: (page: number) => void
}

export const useProductSearch = (
	initialQuery: string = '',
	initialPage: number = 1,
	limit: number = 12
): UseProductSearchResult => {
	const [query, setQuery] = useState<string>(initialQuery)
	const [page, setPage] = useState<number>(initialPage)

	const {
		data: searchResultsData,
		error,
		isLoading,
	} = useSearchProductsQuery({ info: query, page, limit }, { skip: !query })

	useEffect(() => {
		if (initialQuery) {
			setQuery(initialQuery)
		}
	}, [initialQuery])

	const searchResults = searchResultsData?.results || []
	const total = searchResultsData?.total || 200
	const totalPages = Math.ceil(total / limit) || 1

	return {
		query,
		setQuery,
		searchResults,
		total,
		isLoading,
		error,
		totalPages,
		currentPage: page,
		setPage,
	}
}

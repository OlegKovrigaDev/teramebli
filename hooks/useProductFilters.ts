import { useState, useMemo } from 'react'

type FilterOptions = {
	minPrice?: number
	maxPrice?: number
	size?: string
	// Добавьте другие параметры фильтрации по необходимости
}

export const useProductFilters = (currentParams: any) => {
	const [filters, setFilters] = useState<FilterOptions>({})

	// Фильтрация по цене с использованием RetailPrice
	const filteredByPrice = useMemo(() => {
		if (!currentParams) return currentParams
		return currentParams.filter((item: any) => {
			const price = item['RetailPrice'] // Используем ключ RetailPrice для фильтрации по цене
			const isWithinMin =
				filters.minPrice !== undefined ? price >= filters.minPrice : true
			const isWithinMax =
				filters.maxPrice !== undefined ? price <= filters.maxPrice : true
			return isWithinMin && isWithinMax
		})
	}, [currentParams, filters.minPrice, filters.maxPrice])

	// Фильтрация по размеру
	const filteredBySize = useMemo(() => {
		if (!currentParams || !filters.size) return filteredByPrice
		return filteredByPrice.filter((item: any) => {
			const size = item['Размер'] // Используем ключ для размера из currentParams
			return size === filters.size
		})
	}, [filteredByPrice, filters.size])

	// Применение фильтров
	const applyFilter = (filterType: keyof FilterOptions, value: any) => {
		setFilters(prevFilters => ({ ...prevFilters, [filterType]: value }))
	}

	// Сброс фильтров
	const resetFilters = () => {
		setFilters({})
	}

	return {
		filteredResults: filteredBySize,
		filters,
		applyFilter,
		resetFilters,
	}
}

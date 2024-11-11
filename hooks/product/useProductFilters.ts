import { useMemo } from 'react'
import { Product } from '@/types/redux'

interface ProductFilters {
	minPrice?: number
	maxPrice?: number
	attributes?: Record<string, (string | number)[]>
	sortField?: keyof Product
	sortOrder?: 'asc' | 'desc'
}

export const useProductFilters = (
	products: Product[],
	{
		minPrice,
		maxPrice,
		attributes = {},
		sortField,
		sortOrder = 'asc',
	}: ProductFilters
) => {
	const filteredProducts = useMemo(() => {
		return products
			.filter(product => {
				const productPrice = Number(product.currentParams?.RetailPrice)
				return (
					(!minPrice || productPrice >= minPrice) &&
					(!maxPrice || productPrice <= maxPrice)
				)
			})
			.filter(product => {
				return Object.entries(attributes).every(([key, values]) => {
					const productAttributeValue = product.currentParams?.[key]
					return values.includes(productAttributeValue)
				})
			})
			.sort((a, b) => {
				if (!sortField) return 0

				const valueA = a.currentParams?.[sortField] ?? ''
				const valueB = b.currentParams?.[sortField] ?? ''

				if (sortOrder === 'asc') {
					return valueA > valueB ? 1 : -1
				} else {
					return valueA < valueB ? 1 : -1
				}
			})
	}, [products, minPrice, maxPrice, attributes, sortField, sortOrder])

	return filteredProducts
}

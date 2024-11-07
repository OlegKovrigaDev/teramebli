import {
	useFetchCategoryByIdQuery,
	useFetchCategoryWithProductsQuery,
	useFetchSubcategoriesQuery,
} from '@/api/categoryApi'
import { RootState } from '@/store'
import { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'

export const useCategoryData = (
	id: string,
	minPrice?: number,
	maxPrice?: number
) => {
	const selectedStorage = useSelector(
		(state: RootState) => state.selectedStorage.storage
	)
	const [page, setPage] = useState(1)
	const limit = 12

	const {
		data: categoryData,
		error,
		isLoading,
		isFetching,
	} = useFetchCategoryWithProductsQuery(
		{ categoryId: Number(id), page: 1, limit: 7000 },
		{ skip: !id }
	)

	const {
		data: categoryDetails,
		isLoading: categoryLoading,
		error: categoryError,
	} = useFetchCategoryByIdQuery(Number(id), { skip: !id })

	const parentId = categoryDetails?.parentId
	const {
		data: subcategories,
		isLoading: subcategoriesLoading,
		error: subcategoriesError,
	} = useFetchSubcategoriesQuery(parentId ?? 0, { skip: !parentId })

	const productsWithStorage = useMemo(() => {
		if (!categoryData?.products) return []
		return categoryData.products
			.filter(
				product =>
					product[selectedStorage]?.['Відображення на сайті'] === '1' &&
					product[selectedStorage]?.['Кількість на складі'] > 0
			)
			.map(product => ({
				...product,
				currentParams: product[selectedStorage],
			}))
	}, [categoryData?.products, selectedStorage])

	if (isLoading || categoryLoading || subcategoriesLoading) {
		return { status: 'loading', message: 'Загрузка продуктов...', setPage }
	}
	if (error || categoryError || subcategoriesError) {
		return {
			status: 'error',
			message: `Ошибка при загрузке данных: ${JSON.stringify(
				error || categoryError || subcategoriesError
			)}`,
			setPage,
		}
	}
	if (!categoryData || !categoryDetails) {
		return {
			status: 'noData',
			message: 'Нет данных для отображения.',
			setPage,
		}
	}

	const filteredProducts = productsWithStorage
		.filter(product => product.currentParams?.['Назва товару'])
		.filter(product => {
			const productPrice = Number(product.currentParams?.RetailPrice)
			return (
				(!minPrice || productPrice >= minPrice) &&
				(!maxPrice || productPrice <= maxPrice)
			)
		})

	const paginatedProducts = filteredProducts.slice(
		(page - 1) * limit,
		page * limit
	)

	const totalPages = Math.ceil(filteredProducts.length / limit)

	return {
		status: 'success',
		category: categoryData.category,
		products: paginatedProducts,
		totalPages,
		currentPage: page,
		subcategories,
		setPage,
		isFetching,
	}
}

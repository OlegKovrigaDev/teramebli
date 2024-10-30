import {
	useFetchCategoryByIdQuery,
	useFetchCategoryWithProductsQuery,
	useFetchSubcategoriesQuery,
} from '@/api/categoryApi'
import { Product } from '@/types/redux'
import { useState, useMemo } from 'react'

const getInitialStorageAndParams = (product: Product) => {
	const initialStorage = 'paramsFrom_01_MebliBalta' as const
	return {
		selectedStorage: initialStorage,
		currentParams: product[initialStorage],
		availableStorages: Object.keys(product).filter(
			key => key.startsWith('paramsFrom_') && product[key as keyof Product]
		) as (keyof Product)[],
	}
}

export const useCategoryData = (id: string) => {
	const [page, setPage] = useState(1)
	const limit = 12

	const {
		data: categoryData,
		error,
		isLoading,
		isFetching,
	} = useFetchCategoryWithProductsQuery(
		{ categoryId: Number(id), page: 1, limit: 1000 },
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
		return categoryData.products.map(product => ({
			...product,
			...getInitialStorageAndParams(product),
		}))
	}, [categoryData?.products])

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

	const filteredProducts = productsWithStorage.filter(
		product => product.currentParams?.['Відображення на сайті'] === '1'
	)

	const paginatedProducts = filteredProducts.slice(
		(page - 1) * limit,
		page * limit
	)

	const totalPages = Math.ceil(filteredProducts.length / limit)
	const currentPage = page

	return {
		status: 'success',
		category: categoryData.category,
		products: paginatedProducts,
		totalPages,
		currentPage,
		subcategories,
		setPage,
		isFetching,
	}
}

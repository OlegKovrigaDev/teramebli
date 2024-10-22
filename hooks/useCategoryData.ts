import {
	useFetchCategoryByIdQuery,
	useFetchCategoryWithProductsQuery,
} from '@/api/categoryApi'
import { Product } from '@/types/redux'
import { useState } from 'react'

export const useCategoryData = (id: string) => {
	const [page, setPage] = useState(1)
	const limit = 12

	const {
		data: categoryData,
		error,
		isLoading,
		isFetching,
	} = useFetchCategoryWithProductsQuery(
		{ categoryId: Number(id), page, limit },
		{ skip: !id }
	)

	const {
		data: categoryDetails,
		isLoading: categoryLoading,
		error: categoryError,
	} = useFetchCategoryByIdQuery(Number(id), { skip: !id })

	if (isLoading || categoryLoading) {
		return { status: 'loading', message: 'Загрузка продуктов...', setPage }
	}
	if (error) {
		return {
			status: 'error',
			message: `Ошибка при загрузке продуктов: ${JSON.stringify(error)}`,
			setPage,
		}
	}
	if (categoryError) {
		return {
			status: 'error',
			message: `Ошибка при загрузке категории: ${JSON.stringify(
				categoryError
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

	const filteredProducts = categoryData.products.filter(
		(product: Product) => product.params['Відображення на сайті'] === '1'
	)

	const paginatedProducts = filteredProducts.slice(
		(page - 1) * limit,
		page * limit
	)

	const totalPages = Math.ceil(filteredProducts.length / limit)
	const currentPage = page
	const parentId = categoryDetails.parentId
	const parentCategory = parentId ? categoryDetails : null

	return {
		status: 'success',
		category: categoryData.category,
		products: paginatedProducts,
		totalPages,
		currentPage,
		parentCategory,
		setPage,
		isFetching,
	}
}

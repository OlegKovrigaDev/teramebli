import { useMemo } from 'react'
import { Product } from '@/types/redux'
import { useFetchCategoryWithProductsQuery } from '@/api/categoryApi'

const getRandomProducts = (products: Product[], count: number): Product[] => {
	const shuffled = [...products].sort(() => 0.5 - Math.random())
	return shuffled.slice(0, count)
}

export const useRandomProducts = (
	categoryId: number,
	limit: number = 30,
	minCount: number = 5
) => {
	const randomNumber = Math.floor(Math.random() * 9) + 1
	const { data, error, isLoading } = useFetchCategoryWithProductsQuery({
		categoryId: categoryId + randomNumber,
		page: 1,
		limit: 30,
	})

	const randomProducts = useMemo(() => {
		if (data?.products) {
			const visibleProducts = data.products.filter(
				(product: Product) =>
					product.paramsFrom_01_MebliBalta?.['Відображення на сайті'] === '1'
			)
			const selectedProducts = getRandomProducts(
				visibleProducts,
				Math.max(minCount, limit)
			)
			return selectedProducts.slice(0, limit)
		}
		return []
	}, [data, limit, minCount])

	return { randomProducts, error, isLoading }
}

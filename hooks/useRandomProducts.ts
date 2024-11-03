import { useMemo } from 'react'
import { Product } from '@/types/redux'
import { useFetchCategoryWithProductsQuery } from '@/api/categoryApi'

const getRandomProducts = (products: Product[], count: number): Product[] => {
	const shuffled = [...products].sort(() => 0.5 - Math.random())
	return shuffled.slice(0, count)
}

export const useRandomProducts = (
	limit: number = 25,
	usedProductIds: Set<string> = new Set(),
	selectedStorage: keyof Product = 'paramsFrom_03_MebliPervomaisk'
) => {
	const randomCategoryId = Math.floor(Math.random() * 10) + 1
	const { data, error, isLoading } = useFetchCategoryWithProductsQuery({
		categoryId: randomCategoryId,
		page: 1,
		limit: 100,
	})

	const randomProducts = useMemo(() => {
		if (data?.products) {
			const visibleProducts = data.products.filter(
				(product: Product) =>
					product[selectedStorage] && !usedProductIds.has(product.offerId)
			)

			return getRandomProducts(visibleProducts, limit)
		}
		return []
	}, [data, limit, usedProductIds, selectedStorage])

	return { randomProducts, error, isLoading }
}

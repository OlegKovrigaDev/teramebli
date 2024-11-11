import { useMemo } from 'react'
import { Product } from '@/types/redux'
import { useFetchCategoryWithProductsQuery } from '@/api/categoryApi'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const getRandomProducts = (products: Product[], count: number): Product[] => {
	const shuffled = [...products].sort(() => 0.5 - Math.random())
	return shuffled.slice(0, count)
}

export const useRandomProducts = (
	limit: number = 100,
	excludeProductIds: Set<string> = new Set()
) => {
	const selectedStorage = useSelector(
		(state: RootState) => state.selectedStorage.storage
	)
	const randomCategoryId = Math.floor(Math.random() * 50) + 1
	const { data, error, isLoading } = useFetchCategoryWithProductsQuery({
		categoryId: randomCategoryId,
		page: 1,
		limit: 100,
	})

	const randomProducts = useMemo(() => {
		if (data?.products) {
			const visibleProducts = data.products.filter((product: Product) => {
				const storageData = product[selectedStorage]
				return (
					storageData &&
					storageData['Кількість на складі'] > 0 &&
					!excludeProductIds.has(product.offerId) &&
					storageData.RetailPrice !== 0 &&
					storageData.RetailPriceWithDiscount !== 0 &&
					storageData['Назва товару']
				)
			})

			return getRandomProducts(visibleProducts, limit)
		}
		return []
	}, [data, limit, excludeProductIds, selectedStorage])

	return { randomProducts, error, isLoading }
}

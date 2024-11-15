import { useState, useMemo } from 'react'
import { Product } from '@/types/redux'
import { useFetchCategoryWithProductsQuery } from '@/api/categoryApi'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const getRandomProducts = (products: Product[], count: number): Product[] => {
	const shuffled = [...products].sort(() => 0.5 - Math.random())
	return shuffled.slice(0, count)
}

export const useRandomProducts = (
	limit: number = 12,
	excludeProductIds: Set<string> = new Set(),
	initialPage: number = 1
) => {
	const [page, setPage] = useState(initialPage)
	const selectedStorage = useSelector(
		(state: RootState) => state.selectedStorage.storage
	)

	const [randomCategoryId] = useState(Math.floor(Math.random() * 50) + 1)

	const { data, error, isLoading } = useFetchCategoryWithProductsQuery({
		categoryId: randomCategoryId,
		page,
		limit,
	})

	// const randomProducts = useMemo(() => {
	// 	if (data?.products) {
	// 		return getRandomProducts(data.products, limit) // Убираем фильтрацию для теста
	// 	}
	// 	return []
	// }, [data, limit])

	const randomProducts = useMemo(() => {
		if (data?.products) {
			const visibleProducts = data.products.filter((product: Product) => {
				const storageData = product[selectedStorage]

				return (
					storageData &&
					storageData['Відображення на сайті'] === 1 &&
					!excludeProductIds.has(product.offerId) &&
					storageData.RetailPrice !== 0 &&
					storageData['Назва товару']
				)
			})

			return getRandomProducts(visibleProducts, limit)
		}
		return []
	}, [data, limit, excludeProductIds, selectedStorage])

	const loadMore = () => {
		setPage(prevPage => prevPage + 1)
	}

	return { randomProducts, error, isLoading, loadMore }
}

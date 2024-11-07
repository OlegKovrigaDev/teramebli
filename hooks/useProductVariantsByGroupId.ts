import { useMemo } from 'react'
import { useFetchProductByIdQuery } from '@/api/categoryApi'

export const useProductVariantsByGroupId = (offerId: string) => {
	const { data: product, error, isLoading } = useFetchProductByIdQuery(offerId)

	const groupId = product?.groupId

	const productVariants = useMemo(() => {
		if (!groupId) return []

		return Object.keys(product)
			.filter(key => product[key].groupId === groupId)
			.map(key => ({
				variantId: product[key].offerId,
				name: product[key]['Назва товару'],
				quantity: product[key]['Кількість на складі'],
				available: product[key]['Кількість на складі'] > 0,
			}))
	}, [product, groupId])

	return { productVariants, error, isLoading }
}

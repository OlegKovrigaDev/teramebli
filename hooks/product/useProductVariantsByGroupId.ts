import { useMemo } from 'react'
import { useFetchProductByIdQuery } from '@/api/categoryApi'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export const useProductVariantsByGroupId = (offerId: string) => {
	const selectedStorage = useSelector(
		(state: RootState) => state.selectedStorage.storage
	)
	const { data: product, error, isLoading } = useFetchProductByIdQuery(offerId)

	const currentParams = product ? product[selectedStorage] : null
	const groupId = currentParams?.groupId

	const productVariants = useMemo(() => {
		if (!groupId || !product) return []

		return Object.keys(product)
			.filter(key => product[key].groupId === groupId)
			.map(key => ({
				variantId: product[key].offerId,
				name: product[key]['Назва товару'],
				quantity: product[key]['Кількість на складі'],
				available: product[key]['Кількість на складі'] > 0,
			}))
	}, [product, groupId, selectedStorage])

	return { productVariants, error, isLoading }
}

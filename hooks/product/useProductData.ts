import { useFetchProductByIdQuery } from '@/api/categoryApi'
import { RootState } from '@/store'
import { StorageKey } from '@/types/redux'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedStorage } from '../useStorageSelector'

export const useProductData = (offerId: string) => {
	const dispatch = useDispatch()
	const selectedStorage = useSelector(
		(state: RootState) => state.selectedStorage.storage
	)
	const { data: product, error, isLoading } = useFetchProductByIdQuery(offerId)

	const availableStorages = useMemo(() => {
		if (!product) return []
		return Object.keys(product)
			.filter(
				key =>
					key.startsWith('paramsFrom_') &&
					product[key]['Відображення на сайті'] === '1'
			)
			.map(key => ({
				location: key,
				available: product[key]['Кількість на складі'] > 0,
			}))
	}, [product, offerId])

	const currentParams = product ? product[selectedStorage] : null

	const changeStorage = (newStorage: StorageKey) => {
		dispatch(setSelectedStorage(newStorage))
	}

	let mainCategory = 'Не указано'
	let mainCategoryId = 'Не указано'
	let subCategory = ''
	let subCategoryId = ''

	if (product && currentParams) {
		const fullCategorySync = currentParams['Розділ синхронізації повністю']
		const categoryParts = fullCategorySync ? fullCategorySync.split(';') : []

		mainCategory = categoryParts[0]?.split('=')[1]?.trim() || mainCategory
		mainCategoryId = categoryParts[0]?.split('=')[0]?.trim() || mainCategoryId

		if (categoryParts.length > 1) {
			subCategory = categoryParts[1].split('=')[1]?.trim() || ''
			subCategoryId = categoryParts[1].split('=')[0]?.trim() || ''
		}
	}

	return {
		mainCategory,
		mainCategoryId,
		subCategory,
		subCategoryId,
		product,
		currentParams,
		error,
		isLoading,
		availableStorages,
		selectedStorage,
		changeStorage,
	}
}

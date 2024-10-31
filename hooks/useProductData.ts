import { useFetchProductByIdQuery } from '@/api/categoryApi'
import { useState, useCallback } from 'react'
import { StorageKey } from '@/types/redux'

const storageKeys: StorageKey[] = [
	'paramsFrom_01_MebliBalta',
	'paramsFrom_02_MebliPodilsk',
	'paramsFrom_03_MebliPervomaisk',
	'paramsFrom_04_MebliOdesa1',
	'paramsFrom_05_MebliVoznesensk',
]

export const useProductData = (offerId: string) => {
	const { data: product, error, isLoading } = useFetchProductByIdQuery(offerId)
	const [selectedStorage, setSelectedStorage] = useState<StorageKey>(
		'paramsFrom_01_MebliBalta'
	)

	const getAvailableStorages = useCallback(() => {
		if (!product) return []
		return storageKeys.filter(
			key => product[key] && Object.keys(product[key]).length > 0
		)
	}, [product])

	const changeStorage = useCallback((newStorage: StorageKey) => {
		setSelectedStorage(newStorage)
	}, [])

	let mainCategory = 'Не указано'
	let mainCategoryId = 'Не указано'
	let subCategory = ''
	let subCategoryId = ''

	if (product && product[selectedStorage]) {
		const fullCategorySync =
			product[selectedStorage]['Розділ синхронізації повністю']
		const categoryParts = fullCategorySync ? fullCategorySync.split(';') : []

		mainCategory = categoryParts[0]?.split('=')[1]?.trim() || mainCategory
		mainCategoryId = categoryParts[0]?.split('=')[0]?.trim() || mainCategoryId

		if (categoryParts.length > 1) {
			subCategory = categoryParts[1].split('=')[1]?.trim() || ''
			subCategoryId = categoryParts[1].split('=')[0]?.trim() || ''
		}
	}

	const currentParams = product ? product[selectedStorage] : null

	return {
		product,
		error,
		isLoading,
		mainCategory,
		mainCategoryId,
		subCategory,
		subCategoryId,
		selectedStorage,
		changeStorage,
		getAvailableStorages,
		currentParams,
	}
}

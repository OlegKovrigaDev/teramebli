import { useState, useCallback } from 'react'
import { Product, ProductParams, StorageKey } from '@/types/redux'

export const useStorageSelector = (initialProduct: Product) => {
	const [selectedStorage, setSelectedStorage] = useState<StorageKey>(
		'paramsFrom_03_MebliPervomaisk'
	)
	const [currentParams, setCurrentParams] = useState<ProductParams>(
		initialProduct.paramsFrom_03_MebliPervomaisk || ({} as ProductParams)
	)

	const changeStorage = useCallback(
		(newStorage: StorageKey) => {
			setSelectedStorage(newStorage)
			setCurrentParams(initialProduct[newStorage] || ({} as ProductParams))
		},
		[initialProduct]
	)

	const getAvailableStorages = useCallback(() => {
		return Object.keys(initialProduct).filter(
			key => key.startsWith('paramsFrom_') && initialProduct[key as StorageKey]
		) as StorageKey[]
	}, [initialProduct])

	return {
		selectedStorage,
		currentParams,
		changeStorage,
		getAvailableStorages,
	}
}

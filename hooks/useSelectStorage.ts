import { useState, useCallback } from 'react'
import { Product, ProductParams } from '@/types/redux'

type StorageKey =
	| 'paramsFrom_01_MebliBalta'
	| 'paramsFrom_02_MebliPodilsk'
	| 'paramsFrom_03_MebliPervomaisk'
	| 'paramsFrom_04_MebliOdesa1'
	| 'paramsFrom_05_MebliVoznesensk'

export const useStorageSelector = (initialProduct: Product) => {
	const [selectedStorage, setSelectedStorage] = useState<StorageKey>(
		'paramsFrom_03_MebliPervomaisk'
	)
	const [currentParams, setCurrentParams] = useState<ProductParams>(
		initialProduct.paramsFrom_01_MebliBalta
	)

	const changeStorage = useCallback(
		(newStorage: StorageKey) => {
			setSelectedStorage(newStorage)
			setCurrentParams(initialProduct[newStorage])
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

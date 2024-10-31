import Notification from '@/components/notification'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui'
import { header } from '@/constants'
import { RootState } from '@/store'
import { setSelectedStorage } from '@/store/selectedStorageSlice'
import { MapPinned } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List } from '../list'

const storageMap = {
	'м.Балта, Одеська обл.': 'paramsFrom_01_MebliBalta',
	'м.Подільск, Одеська обл.': 'paramsFrom_02_MebliPodilsk',
	'м.Первомайськ, Миколаївська обл.': 'paramsFrom_03_MebliPervomaisk',
	'м.Одеса': 'paramsFrom_04_MebliOdesa1',
} as const

export const Magazins = () => {
	const [notification, setNotification] = useState<{
		message: string
		type: 'success' | 'error'
	} | null>(null)
	const dispatch = useDispatch()
	const { storage } = useSelector((state: RootState) => state.selectedStorage)

	const handleStorageSelect = (town: string) => {
		const storageKey = storageMap[town as keyof typeof storageMap]
		if (storageKey) {
			dispatch(setSelectedStorage(storageKey))
			setNotification({
				message: `Склад "${town}" успешно выбран.`,
				type: 'success',
			})
		} else {
			setNotification({
				message: `Не удалось выбрать склад "${town}".`,
				type: 'error',
			})
		}
	}
	const closeNotification = () => {
		setNotification(null)
	}

	const getActiveClass = (town: string) => {
		const storageKey = storageMap[town as keyof typeof storageMap]
		return storageKey === storage ? 'bg-gray-100' : ''
	}

	return (
		<>
			<HoverCard>
				<HoverCardTrigger className='magazins-trigger'>
					<MapPinned size={24} />
					<span className='text'>{header[2].text}</span>
				</HoverCardTrigger>
				<HoverCardContent className='magazins-content'>
					<List
						items={header[2].magazine}
						className='magazins-list'
						renderItem={({ town, address, time }) => (
							<div
								className={`magazins-list-content cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors ${getActiveClass(
									town
								)}`}
								onClick={() => handleStorageSelect(town)}
							>
								<MapPinned
									size={24}
									className={
										storage === storageMap[town as keyof typeof storageMap]
											? 'text-primary'
											: ''
									}
								/>
								<div className='magazins-list-texts'>
									<p className='magazins-list-text font-medium'>{town}</p>
									<p className='text-sm text-gray-600'>{address}</p>
									<p className='text-sm text-gray-500'>{time}</p>
								</div>
							</div>
						)}
					/>
				</HoverCardContent>
			</HoverCard>
			{notification && (
				<Notification
					message={notification.message}
					type={notification.type}
					onClose={closeNotification}
				/>
			)}
		</>
	)
}

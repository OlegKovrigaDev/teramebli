import { cn } from '@/lib/utils'
import { useEffect } from 'react'

type NotificationProps = {
	message: string
	type: 'success' | 'error'
	onClose: () => void
}

const Notification = ({ message, type, onClose }: NotificationProps) => {
	useEffect(() => {
		const timer = setTimeout(onClose, 5000)
		return () => clearTimeout(timer)
	}, [onClose])

	return (
		<div
			className={cn(
				`fixed top-4 right-4 p-4 rounded shadow-lg z-[1000] ${
					type === 'success' ? 'bg-green' : 'bg-red-500'
				} text-white`
			)}
		>
			{message}
		</div>
	)
}

export default Notification

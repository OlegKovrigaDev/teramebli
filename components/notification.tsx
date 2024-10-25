import { useEffect } from 'react'

type NotificationProps = {
	message: string
	type: 'success' | 'error'
	onClose: () => void
}

const Notification = ({ message, type, onClose }: NotificationProps) => {
	useEffect(() => {
		const timer = setTimeout(onClose, 3000)
		return () => clearTimeout(timer)
	}, [onClose])

	return (
		<div
			className={`fixed top-4 right-4 p-4 rounded shadow-lg ${
				type === 'success' ? 'bg-green-500' : 'bg-red-500'
			} text-white`}
		>
			{message}
		</div>
	)
}

export default Notification

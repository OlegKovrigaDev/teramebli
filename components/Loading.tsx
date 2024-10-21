interface LoadingProps {
	text?: string
	size?: 'small' | 'medium' | 'large'
	color?: string
}

const sizeClasses = {
	small: 'h-6 w-6 border-2',
	medium: 'h-12 w-12 border-4',
	large: 'h-16 w-16 border-8',
}

export const Loading = ({
	text = 'Loading...',
	size = 'medium',
	color = 'border-blue-500',
}: LoadingProps) => {
	return (
		<div className='flex flex-col items-center justify-center space-y-4 py-10'>
			<div
				className={`animate-spin rounded-full border-t-transparent ${sizeClasses[size]} ${color} border-solid`}
			/>
			<p className='text-lg font-medium text-gray-700'>{text}</p>
		</div>
	)
}

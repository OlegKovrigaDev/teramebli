import { cn } from '@/lib/utils'
import { TitleProps } from '@/types'

export const Title = ({ children, size = 'lg' }: TitleProps) => (
	<h2
		className={cn(
			size === 'lg' && 'h2-title-lg',
			size === 'md' && 'h2-title-md'
		)}
	>
		{children}
	</h2>
)

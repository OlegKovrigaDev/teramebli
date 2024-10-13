import { cn } from '@/lib/utils'
import { SectionProps } from '@/types'
import { Title } from './title'

export const Section = ({ title, size = 'lg', children }: SectionProps) => (
	<section
		className={cn(size === 'lg' && 'section-lg', size === 'md' && 'section-md')}
	>
		{title !== '' && <Title size={size}>{title}</Title>}
		{children}
	</section>
)

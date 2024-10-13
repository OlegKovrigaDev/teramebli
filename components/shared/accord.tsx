import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui'
import { AccordProps } from '@/types'

export const Accord = ({
	title,
	className,
	children,
	onToggle,
}: AccordProps) => {
	return (
		<div className='accord-wrapper' onClick={onToggle}>
			<Accordion type='single' collapsible>
				<AccordionItem value='item-1' className='accord-item'>
					<AccordionTrigger className={`accord-trigger ${className}`}>
						{title}
					</AccordionTrigger>
					<AccordionContent className='accord-content'>
						{children}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	)
}

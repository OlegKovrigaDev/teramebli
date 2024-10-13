import { ListProps } from '@/types'

export const List = ({
	items,
	renderItem,
	className,
	classItem,
}: ListProps) => {
	return (
		<ul className={className}>
			{items.map((item, i) => (
				<li key={i} className={classItem}>
					{renderItem(item)}
				</li>
			))}
		</ul>
	)
}

import { home } from '@/constants'
import Link from 'next/link'
import { List } from '../../list'
import { Section } from '../../section'
import css from './categories.module.css'

export const Categories = () => (
	<Section title={home.categories.title}>
		<List
			items={home.categories.data}
			className={css.list}
			classItem={css.item}
			renderItem={({ title, linkId, image }) => (
				<Link href={`/category/${linkId}`}>
					<img src={image} className={css.img} />
					<h3 className={css.title}>{title}</h3>
				</Link>
			)}
		/>
	</Section>
)

import { home } from '@/constants'
import { List } from '../../list'
import { Section } from '../../section'
import css from './ethaps.module.css'

export const Ethaps = () => (
	<Section title={home.ethaps.title}>
		<List
			items={home.ethaps.data}
			className={css.list}
			classItem={css.item}
			renderItem={({ title, text }) => (
				<>
					<h3 className={css.title}>{title}</h3>
					<p className={css.text}>{text}</p>
				</>
			)}
		/>
	</Section>
)

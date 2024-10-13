import { home } from '@/constants'
import { List } from '../list'
import { Section } from '../section'

export const Ethaps = () => (
	<Section title={home.ethaps.title}>
		<List
			items={home.ethaps.data}
			className='ethaps-list counter'
			classItem='ethaps-item'
			renderItem={({ title, text }) => (
				<>
					<h3 className='ethaps-title'>{title}</h3>
					<p className='ethaps-text'>{text}</p>
				</>
			)}
		/>
	</Section>
)

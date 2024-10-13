import { home } from '@/constants'
import { List } from '../list'
import { Section } from '../section'

export const Advantages = () => {
	return (
		<Section title={home.advantages.title}>
			<List
				items={home.advantages.data}
				className='advantages-list'
				classItem='advantages-item'
				renderItem={({ title, text, image }) => (
					<>
						<img src={image} className='advantages-img' width={100} />
						<div className='advantages-content'>
							<h3 className='advantages-title'>{title}</h3>
							<p className='advantages-text'>{text}</p>
						</div>
					</>
				)}
			/>
		</Section>
	)
}

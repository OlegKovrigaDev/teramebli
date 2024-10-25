import { home } from '@/constants'
import { List } from '../../list'
import { Section } from '../../section'
import css from './advantages.module.css'

export const Advantages = () => {
	return (
		<Section title={home.advantages.title}>
			<List
				items={home.advantages.data}
				className={css.list}
				classItem={css.item}
				renderItem={({ title, text, image }) => (
					<>
						<img src={image} className={css.img} width={100} />
						<div className={css.content}>
							<h3 className={css.title}>{title}</h3>
							<p className={css.text}>{text}</p>
						</div>
					</>
				)}
			/>
		</Section>
	)
}

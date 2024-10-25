import { List } from '@/components/shared/list'
import { home } from '@/constants'
import Link from 'next/link'
import css from './heroCategories.module.css'

export const HeroCategories = () => {
	return (
		<div className={css['hero-left']}>
			<List
				items={home.hero.sidebar}
				className={css['sidebar-list']}
				classItem={css['sidebar-item']}
				renderItem={({ id, text, icon }) => (
					<div className={css['sidebar-content']}>
						{!icon ? (
							<div className={css['sidebar-icon']} />
						) : (
							<img src={icon} alt='' className='size-6' />
						)}
						<Link href={`/category/${id}`}>
							<p className={css['sidebar-text']}>{text}</p>
						</Link>
					</div>
				)}
			/>
		</div>
	)
}

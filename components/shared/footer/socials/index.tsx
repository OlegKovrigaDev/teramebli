import Link from 'next/link'
import { List } from '../../list'
import css from './socials.module.css'

export const Socials = ({ title, socials }: any) => {
	return (
		<div className={css.socials}>
			<h3 className={css.title}>{title}</h3>
			{socials && (
				<List
					items={socials}
					className={css.list}
					renderItem={({ icon: Icon, link }) => (
						<Link href={link} target='_blank' className={css.link}>
							<Icon size={24} />
						</Link>
					)}
				/>
			)}
		</div>
	)
}

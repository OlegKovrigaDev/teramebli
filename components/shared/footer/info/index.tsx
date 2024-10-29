import Link from 'next/link'
import { List } from '../../list'
import css from './info.module.css'

export const Info = ({ title, info }: any) => {
	return (
		<div className={css.info}>
			<h3 className={css.title}>{title}</h3>
			{info && (
				<List
					items={info}
					className={css.list}
					renderItem={({ text, link }) => <Link href={link}>{text}</Link>}
				/>
			)}
		</div>
	)
}

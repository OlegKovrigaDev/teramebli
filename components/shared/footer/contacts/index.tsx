import Link from 'next/link'
import { List } from '../../list'
import css from './contacts.module.css'

export const Contacts = ({ title, contacts }: any) => {
	return (
		<div className={css.contacts}>
			<h3 className={css.title}>{title}</h3>
			{contacts && (
				<List
					items={contacts}
					className={css.list}
					renderItem={({ title, text, link }) => (
						<div className={css.content}>
							<p>{title}</p>
							<p className={css.text}>
								{link ? <Link href={link}>{text}</Link> : <>{text}</>}
							</p>
						</div>
					)}
				/>
			)}
		</div>
	)
}

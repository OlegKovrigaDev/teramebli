import { footer } from '@/constants'
import Link from 'next/link'
import { List } from './list'
import { Logo } from './logo'

export const Footer = () => (
	<footer className='footer'>
		<div className='footer-container'>
			<Logo />
			{footer.map(({ contacts, socials, info, title }, i) => (
				<div key={i} className='footer-content'>
					<h3 className='footer-title'>{title}</h3>

					{contacts && (
						<List
							items={contacts}
							className='contact-list'
							renderItem={({ title, text, link }) => (
								<div className='contact-list-container'>
									<p>{title}</p>
									<p className='contact-list-paragraph'>
										{link ? <Link href={link}>{text}</Link> : <>{text}</>}
									</p>
								</div>
							)}
						/>
					)}
					{info && (
						<List
							items={info}
							className='info-list'
							renderItem={({ text, link }) => <Link href={link}>{text}</Link>}
						/>
					)}
					{socials && (
						<List
							items={socials}
							className='social-list'
							renderItem={({ icon: Icon, link }) => (
								<Link href={link} target='_blank' className='social-list-link'>
									<Icon size={24} />
								</Link>
							)}
						/>
					)}
				</div>
			))}
		</div>
	</footer>
)

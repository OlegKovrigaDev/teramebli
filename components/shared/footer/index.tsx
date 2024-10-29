import { footer } from '@/constants'
import { Logo } from '../logo'
import { Contacts } from './contacts'
import css from './footer.module.css'
import { Info } from './info'
import { Socials } from './socials'

export const Footer = () => (
	<footer className={css.footer}>
		<div className={css['footer-container']}>
			<div className={css.logo}>
				<Logo />
			</div>
			<Contacts title={footer[0].title} contacts={footer[0].contacts} />
			<Info title={footer[1].title} info={footer[1].info} />
			<Socials title={footer[2].title} socials={footer[2].socials} />
		</div>
	</footer>
)

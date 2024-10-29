import { about } from '@/constants'
import RenderSections from '@/helpers'
import Image from 'next/image'
import css from './about.module.css'

export default function page() {
	return (
		<div className={css.about}>
			<div className={css.container}>
				<RenderSections data={about.data} />
			</div>
			<Image src='/about.png' alt='' width={452} height={475} />
		</div>
	)
}

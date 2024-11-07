import { about } from '@/constants'
import RenderSections from '@/helpers'
import Image from 'next/image'
import css from './about.module.css'
import { CrumbsLinks } from '@/components/shared/CrumbsLinks'

export default function page() {
	return (
		<div>
			<CrumbsLinks customBreadcrumb={[{ name: 'Про нас' }]} />
			<div className={css.about}>
				<div className={css.container}>
					<RenderSections data={about.data} />
				</div>
				<div>
					<Image src='/about.png' alt='' width={452} height={475} />
				</div>
			</div>
		</div>
	)
}

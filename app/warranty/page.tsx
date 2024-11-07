import { CrumbsLinks } from '@/components/shared/CrumbsLinks'
import { warranty } from '@/constants'
import RenderSections from '@/helpers'

export default function Warranty() {
	return (
		<div>
			<CrumbsLinks customBreadcrumb={[{ name: 'Гарантія та Повернення' }]} />
			<div className='warranty'>
				<RenderSections data={warranty} />
			</div>
		</div>
	)
}

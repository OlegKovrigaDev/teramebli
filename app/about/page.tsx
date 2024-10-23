import { about } from '@/constants'
import RenderSections from '@/helpers'

export default function page() {
	return (
		<div className='about'>
			<div className='about-container'>
				<RenderSections data={about.data} />
			</div>
			<img src='/about.png' alt='' width={452} height={475} />
		</div>
	)
}

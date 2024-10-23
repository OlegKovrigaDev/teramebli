import { about } from '@/constants'
import RenderSections from '@/helpers'

export default function page() {
	return (
		<div className='about'>
			<RenderSections data={about.data} />
			<img src='/about.png' alt='' />
		</div>
	)
}

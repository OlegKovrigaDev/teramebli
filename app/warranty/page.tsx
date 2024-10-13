import { warranty } from '@/constants'
import RenderSections from '@/helpers'

export default function Warranty() {
	return (
		<div className='warranty'>
			<RenderSections data={warranty} />
		</div>
	)
}

import { delivery, payment } from '@/constants'
import RenderSections from '@/helpers'

export default function Delivery() {
	return (
		<div className='delivery'>
			<h2 className='delivery-title'>{delivery.title}</h2>
			<div className='delivery-container'>
				<RenderSections data={delivery.data} />
			</div>
			<h2 className='delivery-title'>{payment.title}</h2>
			<div className='delivery-container'>
				<RenderSections data={payment.data} />
			</div>
		</div>
	)
}
